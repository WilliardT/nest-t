import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionFilter } from "./common/filters/all-exceptions.filter";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./utils/swagger.util";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  // валидация для DTO
  // валидация до обращения к базе, и например id не будет тратиться на невалидные запросы.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: true
  }));


  app.useGlobalInterceptors(new ResponseInterceptor()) // для преобразования данных

  app.useGlobalFilters(new AllExceptionFilter())

  // app.enableCors({
  //   origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: false // куки или сессии
  // })

  //app.setGlobalPrefix('api')

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
