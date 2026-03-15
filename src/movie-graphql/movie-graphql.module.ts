import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "../movie/entities/movie.entity";
import { MovieGraphqlService } from './movie-graphql.service';
import { MovieGraphqlResolver } from './movie-graphql.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieGraphqlResolver, MovieGraphqlService],
})
export class MovieGraphqlModule {}
