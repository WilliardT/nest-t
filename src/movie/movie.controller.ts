import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";


@Controller({
  path: 'movies'
  // etc settings
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() query: any){
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number){
    return this.movieService.findById(id)
  }

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id:number,
    @Body() dto: UpdateMovieDto
  ) {
    return this.movieService.update(id, dto)
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

