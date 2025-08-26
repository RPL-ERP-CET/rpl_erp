import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtConfigFactory } from "./jwt.costants";
import { Session } from "./entities/session.entity";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([Session]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfigFactory,
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
