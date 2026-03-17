import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MovieGraphqlService } from './movie-graphql.service';
import { MovieModel } from "./models/movie.model";
import { CreateMovieInput } from "./inputs/create-movie.input";


@Resolver(() => MovieModel)
export class MovieGraphqlResolver {
  constructor(private readonly movieGraphqlService: MovieGraphqlService) {}

  @Query(
    () => [MovieModel],
    {
      name: 'get_all_movies',
      description: 'get all movies on DB'
    }
  )
  getMovies() {
    return this.movieGraphqlService.getAll()
  }


  @Mutation(() => MovieModel)
  createMovie(@Args('input') input: CreateMovieInput) {
    return this.movieGraphqlService.create(input)
  }
}
