import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";


const movie = {
  id: 1,
  title: '8 Miles',
  releaseYear: 2002,
}

const createDto: CreateMovieDto = {
  title: '8 Miles',
  releaseYear: 2002,
  actorIds: [1, 2],
}


describe('MovieController', () => {
  let controller: MovieController
  let service: MovieService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([movie]),
            findById: jest.fn().mockResolvedValue(movie),
            create: jest.fn().mockResolvedValue(movie),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(movie.id),
          }
        }
      ]
    }).compile()

    controller = module.get<MovieController>(MovieController)
    service = module.get<MovieService>(MovieService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return an array of movies', async () => {
    const result = await controller.findAll({})

    expect(result).toEqual([movie])

    expect(service.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return a single movie by id', async () => {
    const result = await controller.findById(movie.id)

    expect(result).toEqual(movie)

    expect(service.findById).toHaveBeenCalledWith(movie.id)
  })

  it('should throw NotFoundException if movie not found', async () => {
    jest.spyOn(service, 'findById').mockRejectedValueOnce(new NotFoundException('Фильм не найден'))

    await expect(controller.findById(999)).rejects.toThrow(NotFoundException)
  })

  it('should create a new movie', async () => {
    const result = await controller.create(createDto)

    expect(result).toEqual(movie)

    expect(service.create).toHaveBeenCalledWith(createDto)
  })

  it('should update a movie', async () => {
    const updateDto = { title: 'New Title', releaseYear: 2005 }
    const result = await controller.update(movie.id, updateDto)

    expect(result).toEqual(true)

    expect(service.update).toHaveBeenCalledWith(movie.id, updateDto)
  })

  it('should delete a movie', async () => {
    const result = await controller.delete(movie.id)

    expect(result).toEqual(movie.id)

    expect(service.delete).toHaveBeenCalledWith(movie.id)
  })
})
