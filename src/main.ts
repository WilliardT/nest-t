import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionFilter } from "./common/filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // валидация для DTO
  //app.useGlobalPipes(new ValidationPipe());

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

  // todo вынести
  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('API documentation:')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
  // <==

  await app.listen(3000);
}

bootstrap();
