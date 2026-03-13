import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";


@ApiTags('Movies')
@Controller({
  path: 'movies'
  // etc settings
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // ПОЛУЧИТЬ ВСЕ ФИЛЬМЫ

  @ApiOperation({
    summary: 'Получить все фильмы',
    description: 'Возвращает все фильмы по установленному условию выборки из базы данных'
  })
  @ApiOkResponse({ description: 'Фильмы найдены:' })
  @Get()
  findAll(@Query() query: any){
    return this.movieService.findAll();
  }

  // ПОЛУЧИТЬ ФИЛЬМ ПО ID

  @ApiOperation({
    summary: 'Получить фильм по ID',
    description: 'Возвращает информацию о фильме'
  })
  @ApiOkResponse({ description: 'Фильмы найден:' })
  @ApiNotFoundResponse({ description: 'Фильм не найден.' })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number){
    return this.movieService.findById(id)
  }

  // СОЗДАТЬ ФИЛЬМ

  @ApiOperation({ summary: 'Создать фильм', })
  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body)
  }

  // ОБНОВИТЬ ФИЛЬМ

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id:number,
    @Body() dto: UpdateMovieDto
  ) {
    return this.movieService.update(id, dto)
  }

  // УДАЛИТЬ ФИЛЬМ

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id)
  }


  // заголовки
  // @Get('headers')
  // getHeaders(@Headers() headers: any) {
  //   return headers
  // }
  //
  // // c какого приложения был отправлен
  // @Get('user-agent')
  // getHeaders(@Headers('user-agent') userAgent: string) {
  //   return { userAgent }
  // }
  //
  // // с объектом запроса
  // @Get()
  // getRequestDetails(@Req() req: Request) {
  //   return {
  //     method: req.method,
  //     url: req.url,
  //     headers: req.headers
  //   }
  // }
  //
  // // с объектом ответа
  // @Get()
  // getRequestDetails(@Res() res: Response) { // @Ip @Session получить ip и сессию
  //   res.status(201)
  //     .json({ message: 'Hello' })
  // }

}

