import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionFilter } from "./common/filters/all-exceptions.filter";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./utils/swagger.util";
import { CustomLoggerService } from "./common/logger/logger.service";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.use(cookieParser())

  app.useLogger(app.get(CustomLoggerService))

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

  app.setGlobalPrefix('api')

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
