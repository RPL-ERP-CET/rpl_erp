import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { SessionModule } from "./session/session.module";
import { PermissionsModule } from "./permissions/permissions.module";

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
    UsersModule,
    SessionModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
