import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieEntity } from "../movie/entities/movie.entity";


@Injectable()
export class MovieGraphqlService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  getAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find()
  }
}
