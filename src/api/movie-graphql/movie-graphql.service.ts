import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { MovieEntity } from "../movie/entities/movie.entity";
import { ActorEntity } from "../actor/entities/actor.entity";
import { MoviePosterEntity } from "../movie/entities/poster.entity";
import { CreateMovieInput } from "./inputs/create-movie.input";


@Injectable()
export class MovieGraphqlService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,

    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
  ) {}

  async getAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find()
  }

  async create(input: CreateMovieInput): Promise<MovieEntity> {
    const { title, releaseYear, imageUrl, actorIds } = input

    const uniqueActorIds = [...new Set(actorIds)]

    const actors = await this.actorRepository.find({
      where: { id: In(uniqueActorIds) }
    })

    if (actors.length !== uniqueActorIds.length) {
      throw new NotFoundException('Один или несколько актёров не найдены')
    }

    let poster: MoviePosterEntity | null = null

    if (imageUrl) {
      poster = this.posterRepository.create({ url: imageUrl })

      await this.posterRepository.save(poster)
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors
    })

    return this.movieRepository.save(movie)
  }
}
