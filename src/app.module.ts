import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";

// docker run --name nest-db-conteiner -e POSTGRES_PASSWORD=postgres_pass -p 5432:5432 -d postgres


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // тип бвзы данных
      host: 'localhost', //  хост бд
      port: 5432, // стандартный порт PostgreSQL
      username: 'postgres_user', // имя пользователя в бд
      password: 'postgres_pass', // пароль от бд
      database: 'nestjs_bd', // имя базы данных
      autoLoadEntities: true, // автоматически подключает все entity
      synchronize: true // авто создание таблиц по entity
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
