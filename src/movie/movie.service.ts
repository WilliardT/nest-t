import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
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
    })

    if (!movie) {
      throw new NotFoundException(`Фильм не найден`)
    }

    return movie;
  }

  async create(dto: CreateMovieDto):Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto)

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
