import { Resolver, Query } from '@nestjs/graphql';
import { MovieGraphqlService } from './movie-graphql.service';
import { MovieModel } from "./models/movie.model";


@Resolver(() => MovieModel)
export class MovieGraphqlResolver {
  constructor(private readonly movieGraphqlService: MovieGraphqlService) {}

  @Query(() => [MovieModel])
  getMovies() {
    return this.movieGraphqlService.getAll()
  }
}
