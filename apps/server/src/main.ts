import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
// import { RolesGuard } from "./common/guards/roles/roles.guard";
import { CatchEverythingFilter } from "src/common/filters/exceptions.filter";
import { ValidationPipe } from "@nestjs/common";

const PORT = process.env.PORT ?? 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard());
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
