import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { GraphQLModule } from "@nestjs/graphql";
import { getGraphqlConfig } from "./config/graphql.config";
import { ApolloDriver } from "@nestjs/apollo";
import { CustomLoggerService } from "./common/logger/logger.service";
import { DatabaseModule } from "./infra/database/database.module";
import { ApiModule } from "./api/api.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    DatabaseModule,

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphqlConfig,
      inject: [ConfigService]
    }),

    ApiModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CustomLoggerService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
