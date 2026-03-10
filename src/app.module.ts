import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import { LoggerMiddlewareUsers } from "./users/middleware/logger.middleware";
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [
    //ConfigModule.forRoot(), // Загрузка переменных окружения из .env

    //TypeOrmModule.forRootAsync({
    //  useFactory: async() => ({
    TypeOrmModule.forRoot({
      type: 'postgres',          // тип бвзы данных
      host: 'localhost',         //  хост бд
      port: 5432,                // стандартный порт PostgreSQL
      username: 'postgres_user', // имя пользователя в бд
      password: 'postgres_pass', // пароль от бд
      database: 'nestjs_bd',     // имя базы данных
      autoLoadEntities: true,    // автоматически подключает все entity
      synchronize: true,         // авто создание таблиц по entity
    }),

    UsersModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareUsers).forRoutes('*')
  }
}
