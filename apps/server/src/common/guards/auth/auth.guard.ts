import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "src/common/types/jwt-payload";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractToken(request);
    if (token === undefined)
      throw new UnauthorizedException({
        message: "Invalid token",
        error: "Unauthorized error",
      });
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
    } catch (_error) {
      throw new UnauthorizedException({
        message: "Token verification failed",
        error: "Unauthorized error",
      });
    }
    if (payload && payload?.id) {
      const user = await this.userService.getUser(payload.id);
      if (!user)
        throw new UnauthorizedException({
          message: "User not found",
          error: "Unauthorized error",
        });
      request.user = user;
    } else {
      throw new UnauthorizedException({
        message: "Token payload is invalid",
        error: "Unauthorized error",
      });
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type == "Bearer" ? token : undefined;
  }
}
