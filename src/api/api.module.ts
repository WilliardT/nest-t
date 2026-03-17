import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MovieModule } from "./movie/movie.module";
import { ReviewModule } from "./review/review.module";
import { ActorModule } from "./actor/actor.module";
import { MovieGraphqlModule } from "./movie-graphql/movie-graphql.module";
import {
  TechnicalSupportChatModule
} from "./technical-support-chat/technical-support-chat.module";
import { PostsModule } from "./posts/posts.module";


@Module({
  imports: [
    AuthModule,
    MovieModule,
    ReviewModule,
    ActorModule,
    MovieGraphqlModule,
    TechnicalSupportChatModule,
    PostsModule,
  ],
  exports: [PostsModule]
})

export class ApiModule {}
