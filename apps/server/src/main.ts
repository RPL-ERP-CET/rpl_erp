import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
//import { RolesGuard } from "./common/guards/roles/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap()
  .then(() => console.log(`Server is running on ${process.env.PORT}`))
  .catch(console.error);
