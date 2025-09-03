import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";

import { UsersService } from "src/users/users.service";
import { AuthGuard } from "src/common/guards/auth/auth.guard";
import { CatchEverythingFilter } from "src/common/filters/exceptions.filter";
import { AppModule } from "./app.module";

const PORT = process.env.PORT ?? 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new AuthGuard(
      app.get(JwtService),
      app.get(ConfigService),
      app.get(UsersService),
      app.get(Reflector),
    ),
  );
  app.use(cookieParser());
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle("Server")
    .setDescription("The server for RPL-ERP API")
    .setVersion("1.0")
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, documentFactory);

  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Server is running on ${PORT}`))
  .catch(console.error);
