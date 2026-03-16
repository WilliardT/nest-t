import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from "./common/pipes/string-to-lowercase.pipe";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('root-App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users-posts')
  getUsersPosts() {
    return this.appService.getAllUsersPosts();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(
    @Body('title') title: string
  ) {
    return `Movie: ${title}`
  }

}
