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
import { Reflector } from "@nestjs/core";
import { SKIP_AUTH_KEY } from "src/common/decorators/skip-auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractToken(request);

    if (token === undefined)
      throw new UnauthorizedException({
        message: "Invalid token",
        error: "Unauthorized error",
      });

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verify(token, {
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
