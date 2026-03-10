import {Body, Controller, Get, Param, Post, Query, Req, Res} from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller({
  path: 'movies'
  // etc settings
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() query: any){
    return {}
  }

  @Get(':id')
  findById(@Param('id') id:string){
    return { id }
  }

  @Post()
  create(@Body() body: { title: string }) {
    return body
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

