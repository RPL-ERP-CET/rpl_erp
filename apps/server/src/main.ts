import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Server")
    .setDescription("The server for RPL-ERP API")
    .setVersion("1.0")
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap()
  .then(() => console.log(`Server is running on ${process.env.PORT}`))
  .catch(console.error);
