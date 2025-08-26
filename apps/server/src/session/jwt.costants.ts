import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "1h"),
      },
    };
  }
}
