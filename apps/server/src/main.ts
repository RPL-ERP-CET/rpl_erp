import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
