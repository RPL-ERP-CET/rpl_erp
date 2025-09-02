import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Session } from "./entities/session.entity";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { UsersModule } from "src/users/users.module";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    CommonModule,
    TypeOrmModule.forFeature([Session]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
