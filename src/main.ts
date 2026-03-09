import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // валидация для DTO
  app.useGlobalPipes(new ValidationPipe());

  // app.enableCors({
  //   origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: false // куки или сессии
  // })

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
