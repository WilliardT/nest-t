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

      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('POSTGRES_HOST'),
        port: config.getOrThrow<number>('POSTGRES_PORT'),
        username: config.getOrThrow<string>('POSTGRES_USER'),
        password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: config.getOrThrow<string>('POSTGRES_DATABASE'),

        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
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
