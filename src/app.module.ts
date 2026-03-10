import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddlewareUsers } from "./users/middleware/logger.middleware";
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST', 'localhost'),
        port: config.get<number>('POSTGRES_PORT', 5432),
        username: config.get<string>('POSTGRES_USER', 'postgres_user'),
        password: config.get<string>('POSTGRES_PASSWORD', 'postgres_pass'),
        database: config.get<string>('POSTGRES_DATABASE', 'nestjs_bd'),

        autoLoadEntities: true,
        synchronize: true,
      }),
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
