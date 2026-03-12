import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { In, Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ActorEntity } from "../actor/entities/actor.entity";


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>
  ) {}

  async findAll():Promise<MovieEntity[]>{
    return await this.movieRepository.find({
      where:{
        isAvailable: true
      },
      order: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true
      }
      // take: 1
      // skip
    })
  }

  async findById(id: number):Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id
      },
      relations: ['actors']
    })

    if (!movie) {
      throw new NotFoundException(`Фильм не найден`)
    }

    return movie;
  }

  async create(dto: CreateMovieDto):Promise<MovieEntity> {
    const { title, releaseYear, actorIds } = dto

    const uniqueActorIds = [...new Set(actorIds)]

    const actors = await this.actorRepository.find({
      where: {
        id: In(uniqueActorIds)
      }
    })

    if (actors.length !== uniqueActorIds.length) {
      throw new NotFoundException('Один или несколько актеров не найдены')
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      actors
    })

    return await this.movieRepository.save(movie)
  }

  async update(id: number, dto: UpdateMovieDto):Promise<boolean> {
    //const movie = await this.movieRepository.findOne({})
    const movie = await this.findById(id)

    Object.assign(movie, dto)

    await this.movieRepository.save(movie)

    return true;
  }

  // patch частичное изменение

  async delete(id: number):Promise<number> {
    //const movie = await this.movieRepository.findOne({}) or .findOneBy({ id });
    const movie = await this.findById(id)

    await this.movieRepository.remove(movie)

    return movie.id
  }

}
