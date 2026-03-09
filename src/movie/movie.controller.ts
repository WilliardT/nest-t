import { Controller } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller({
  path: 'movies'
  // etc settings if need
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
}
