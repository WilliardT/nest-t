import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';


describe('MovieController (e2e)', () => {
  let app: INestApplication<App>
  let actorId: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    app.useGlobalInterceptors(new ResponseInterceptor())

    await app.init()

    // создаём актёра чтобы не зависеть от состояния БД
    const actor = await request(app.getHttpServer())
      .post('/actors')
      .send({ name: 'Test Actor' })

    actorId = actor.body.data.id
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /movies - should create movie', async () => {
    const dto = { title: 'Title movie', releaseYear: 1990, actorIds: [actorId] }

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(dto)
      .expect(201)

    expect(response.body.data).toMatchObject({ title: dto.title })
    expect(response.body.status).toBe('OK')
  })

  it('GET /movies/:id - should return 400 if id is not a number', async () => {
    await request(app.getHttpServer())
      .get('/movies/not-a-number')
      .expect(400)
  })

  it('GET /movies/:id - should return 404 if movie not found', async () => {
    await request(app.getHttpServer())
      .get('/movies/999999')
      .expect(404)
  })

  it('GET /movies/:id - should return one movie by id', async () => {
    const dto = { title: 'Title movie', releaseYear: 1990, actorIds: [actorId] }

    const created = await request(app.getHttpServer())
      .post('/movies')
      .send(dto)
      .expect(201)

    const movieId = created.body.data.id

    const response = await request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .expect(200)

    expect(response.body.data).toMatchObject({ id: movieId, title: dto.title })
  })
})
