import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { SessionModule } from "./session/session.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "src/roles/roles.module";
import { CommonModule } from "src/common/common.module";
import { JwtConfigFactory } from "src/common/constants/jwt.costants";
import { CatchEverythingFilter } from "src/common/filters/exceptions.filter";
import { AuthGuard } from "./common/guards/auth/auth.guard";
import { PermissionsGuard } from "src/common/guards/permissions/permissions.guard";
import { ResponseInterceptor } from "src/common/interceptors/response/response.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const DOCKERIZED = configService.get<string>("DOCKERIZED");
        return {
          type: "postgres",
          host:
            !DOCKERIZED || DOCKERIZED === "true"
              ? configService.getOrThrow<string>("POSTGRES_HOST")
              : "localhost",
          port: configService.getOrThrow<number>("POSTGRES_PORT"),
          username: configService.getOrThrow<string>("POSTGRES_USER"),
          password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
          database: configService.getOrThrow<string>("POSTGRES_DB"),
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          synchronize: configService.getOrThrow<boolean>("POSTGRES_SYNC"),
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfigFactory,
    }),
    UsersModule,
    SessionModule,
    PermissionsModule,
    RolesModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
