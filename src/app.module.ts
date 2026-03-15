import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { MovieModule } from './movie/movie.module';
import { getTypeOrmConfig } from "./config/typeorm.config";
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from "@nestjs/graphql";
import { getGraphqlConfig } from "./config/graphql.config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MovieGraphqlModule } from './movie-graphql/movie-graphql.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: getGraphqlConfig
    }),

    MovieModule,
    ReviewModule,
    ActorModule,
    AuthModule,
    MovieGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
