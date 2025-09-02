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
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
      if (payload && payload?.id) {
        request.user = await this.userService.getUser(payload.id);
      } else {
        throw new UnauthorizedException({
          message:
            "Token payload is invalid or does not contain user identification",
          error: "Unauthorized error",
        });
      }
    } catch (_error) {
      throw new UnauthorizedException({
        message: "Token verification failed",
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
