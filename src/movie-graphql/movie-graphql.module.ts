import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "../movie/entities/movie.entity";
import { ActorEntity } from "../actor/entities/actor.entity";
import { MoviePosterEntity } from "../movie/entities/poster.entity";
import { MovieGraphqlService } from './movie-graphql.service';
import { MovieGraphqlResolver } from './movie-graphql.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([
    MovieEntity,
    ActorEntity,
    MoviePosterEntity
  ])],
  providers: [MovieGraphqlResolver, MovieGraphqlService],
})
export class MovieGraphqlModule {}
