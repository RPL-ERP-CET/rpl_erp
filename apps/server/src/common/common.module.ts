import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthGuard } from "./guards/auth/auth.guard";
import { CatchEverythingFilter } from "./filters/exceptions.filter";
import { JwtConfigFactory } from "./constants/jwt.costants";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [ConfigModule, forwardRef(() => UsersModule)],
  providers: [AuthGuard, CatchEverythingFilter, JwtConfigFactory],
  exports: [CatchEverythingFilter, AuthGuard, JwtConfigFactory],
})
export class CommonModule {}
