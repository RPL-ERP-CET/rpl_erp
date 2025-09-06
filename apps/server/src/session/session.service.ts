import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { createHash } from "crypto";
import { Cron, CronExpression } from "@nestjs/schedule";

import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.entity";
import { Session } from "./entities/session.entity";
import { SignUpAuthDto } from "./dto/signup-session.dto";

@Injectable()
export class SessionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<Record<string, string>> {
    const user = await this.usersService.createUser(createUserDto);
    return this.getTokens(user);
  }

  async signIn(signUpAuthDto: SignUpAuthDto): Promise<Record<string, string>> {
    const user = await this.usersService.getUserByEmail(signUpAuthDto.email);
    await this.usersService.comparePassword(user.email, signUpAuthDto.password);
    await this.cleanUpUserSessions(user.id);
    return this.getTokens(user);
  }

  async verifyAccessToken(token: string): Promise<User> {
    const decoded: User = await this.jwtService.verifyAsync(token);
    const user = await this.usersService.getUser(decoded.id);
    return user;
  }

  async verifyRefreshToken(
    token: string,
    user: User,
  ): Promise<Record<string, boolean>> {
    const session = await this.sessionRepo.findOneBy({
      user: { id: user.id },
      refresh_token: this.hashToken(token),
      expires: MoreThan(new Date()),
    });
    if (!session) throw new UnauthorizedException("Invalid refresh token");
    return { valid: true };
  }

  async refreshTokens(
    user: User,
    token: string,
  ): Promise<Record<string, string>> {
    const session = await this.sessionRepo.findOneBy({
      user: { id: user.id },
      refresh_token: this.hashToken(token),
    });
    if (!session || session.expires < new Date()) {
      if (session) await this.sessionRepo.remove(session);
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    await this.sessionRepo.remove(session);
    return this.getTokens(user);
  }

  async getTokens(user: User): Promise<Record<string, string>> {
    const refreshToken = uuid();
    const expires = new Date(
      Date.now() +
        parseInt(
          this.configService.get<string>("REFRESH_EXPIRES_IN") as string,
          10,
        ) || 604800000,
    );

    const session = this.sessionRepo.create({
      refresh_token: this.hashToken(refreshToken),
      expires,
      user: user,
    });

    await this.sessionRepo.save(session);

    const accessToken = await this.generateAccessToken(user.id, session.id);
    return { accessToken, refreshToken };
  }

  private async cleanUpExpiredSessions(userId?: string) {
    try {
      const whereCondition = {
        expires: LessThan(new Date()),
      };

      if (userId) whereCondition["user"] = { id: userId };

      const expiredSessions = await this.sessionRepo.find({
        where: whereCondition,
      });

      if (expiredSessions.length > 0)
        await this.sessionRepo.remove(expiredSessions);
    } catch (error) {
      console.log(error);
    }
  }

  private async cleanUpUserSessions(userId: string) {
    try {
      await this.cleanUpExpiredSessions(userId);
      const maxSessions = this.configService.get<number>("MAX_SESSIONS", 5);

      const sessions = await this.sessionRepo.find({
        where: {
          user: { id: userId },
          expires: MoreThan(new Date()),
        },
        order: { createdAt: "DESC" },
      });
      const sessionsToRemove = sessions.slice(maxSessions - 1);
      if (sessions.length > maxSessions)
        await this.sessionRepo.remove(sessionsToRemove);
    } catch (error) {
      console.log(error);
    }
  }

  async getActiveSessions(user: User): Promise<Session[]> {
    try {
      const sessions = await this.sessionRepo.find({
        where: {
          user: { id: user.id },
          expires: MoreThan(new Date()),
        },
        order: { createdAt: "DESC" },
      });

      return sessions;
    } catch (error) {
      console.error(
        `Failed to get active sessions for user ${user.id}: ${error as string}`,
      );
      throw new InternalServerErrorException("Failed to retrieve sessions");
    }
  }

  async revokeSession(user: User, sessionId: string): Promise<number> {
    try {
      const result = await this.sessionRepo.delete({
        id: sessionId,
        user: { id: user.id },
      });

      const sessionsTerminated = result.affected || 0;

      if (sessionsTerminated === 0) {
        throw new BadRequestException({
          message: "Session not found or already revoked",
          error: "Bad request",
        });
      }

      console.log(`Session ${sessionId} revoked for user ${user.id}`);

      return sessionsTerminated;
    } catch (error) {
      console.error(
        `Failed to revoke session ${sessionId} for user ${user.id}: ${error as string}`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async generateAccessToken(id: string, sessionId: string): Promise<string> {
    return await this.jwtService.signAsync({ id, sessionId, jti: uuid() });
  }

  async logout(user: User, token: string): Promise<void> {
    await this.sessionRepo.delete({
      user: { id: user.id },
      refresh_token: this.hashToken(token),
    });
  }

  private hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }

  @Cron(CronExpression.EVERY_HOUR)
  async scheduledCleanup(): Promise<void> {
    try {
      await this.cleanUpExpiredSessions();
    } catch (error) {
      console.error(`Scheduled cleanup failed: ${error as string}`);
    }
  }
}
