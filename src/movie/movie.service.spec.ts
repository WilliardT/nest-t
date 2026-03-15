import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieEntity } from "./entities/movie.entity";
import { ActorEntity } from "../actor/entities/actor.entity";
import { MoviePosterEntity } from "./entities/poster.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";


const movie: Partial<MovieEntity> = {
  id: 1,
  title: '8 Miles',
  releaseYear: 2002,
  actors: [],
  poster: null,
}

const createDto: CreateMovieDto = {
  title: '8 Miles',
  releaseYear: 2002,
  actorIds: [1, 2],
}

const actors: Partial<ActorEntity>[] = [
  { id: 1, name: 'Actor One' },
  { id: 2, name: 'Actor Two' },
]


describe('MovieService', () => {
  let service: MovieService

  const mockMovieRepository = {
    find: jest.fn().mockResolvedValue([movie]),
    findOne: jest.fn().mockResolvedValue(movie),
    create: jest.fn().mockReturnValue(movie),
    save: jest.fn().mockResolvedValue(movie),
    remove: jest.fn().mockResolvedValue(movie),
  }

  const mockActorRepository = {
    find: jest.fn().mockResolvedValue(actors),
  }

  const mockPosterRepository = {
    create: jest.fn().mockReturnValue({ id: 'uuid', url: 'https://example.com/poster.jpg' }),
    save: jest.fn().mockResolvedValue({ id: 'uuid', url: 'https://example.com/poster.jpg' }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: getRepositoryToken(MovieEntity), useValue: mockMovieRepository },
        { provide: getRepositoryToken(ActorEntity), useValue: mockActorRepository },
        { provide: getRepositoryToken(MoviePosterEntity), useValue: mockPosterRepository },
      ],
    }).compile()

    service = module.get<MovieService>(MovieService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return an array of movies', async () => {
    const result = await service.findAll()

    expect(result).toEqual([movie])

    expect(mockMovieRepository.find).toHaveBeenCalledTimes(1)
  })

  it('should return a single movie by id', async () => {
    const result = await service.findById(1)

    expect(result).toEqual(movie)

    expect(mockMovieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['actors'] })
  })

  it('should throw NotFoundException if movie not found', async () => {
    mockMovieRepository.findOne.mockResolvedValueOnce(null)

    await expect(service.findById(999)).rejects.toThrow(NotFoundException)
  })

  it('should create a movie', async () => {
    const result = await service.create(createDto)

    expect(result).toEqual(movie)

    expect(mockActorRepository.find).toHaveBeenCalled()

    expect(mockMovieRepository.save).toHaveBeenCalled()
  })

  it('should throw NotFoundException if actors not found on create', async () => {
    mockActorRepository.find.mockResolvedValueOnce([actors[0]]) // вернули 1, а запросили 2

    await expect(service.create(createDto)).rejects.toThrow(NotFoundException)
  })

  it('should delete a movie and return its id', async () => {
    const result = await service.delete(1)

    expect(result).toEqual(movie.id)

    expect(mockMovieRepository.remove).toHaveBeenCalledWith(movie)
  })
})
