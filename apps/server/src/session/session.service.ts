import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { createHash } from "crypto";

import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.entity";
import { Session } from "./entities/session.entity";
import { SignUpAuthDto } from "./dto/signup-session.dto";

@Injectable()
export class SessionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    return this.getTokens(user);
  }

  async verifyAccessToken(
    token: string,
  ): Promise<Record<string, boolean | string>> {
    const decoded: User = await this.jwtService.verifyAsync(token);
    const user = await this.usersService.getUser(decoded.id);
    return { ...user };
  }

  async verifyRefreshToken(
    token: string,
    user: User,
  ): Promise<Record<string, boolean>> {
    const session = await this.sessionRepo.findOneBy({
      user: { id: user.id },
      refresh_token: this.hashToken(token),
    });
    if (!session) throw new UnauthorizedException("Invalid refresh token");
    if (session.expires < new Date()) {
      await this.sessionRepo.delete(session);
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
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

    const session = this.sessionRepo.create({
      refresh_token: this.hashToken(refreshToken),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      user,
    });

    await this.sessionRepo.save(session);

    const accessToken = await this.generateAccessToken(user);
    return { accessToken, refreshToken };
  }

  async generateAccessToken(user: User): Promise<string> {
    return await this.jwtService.signAsync({ ...user, jti: uuid() });
  }

  async logout(user: User, token: string): Promise<void> {
    await this.sessionRepo.delete({
      user: { id: user.id },
      refresh_token: this.hashToken(token),
    });
  }

  hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
