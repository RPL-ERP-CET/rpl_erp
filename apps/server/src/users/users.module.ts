import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CommonModule } from "src/common/common.module";
import { RolesModule } from "src/roles/roles.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CommonModule),
    forwardRef(() => RolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
