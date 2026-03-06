import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';


// порядок следования важен - видимость и реакция url на выдачу
@Controller('users')
export class UsersController {

  @Get()
  getAllUsers(): string {
    return 'All users'
  }

  @Get('about')
  getAllUsersAbout(): string {
    return 'All users about'
  }

  @Get('search')
  getUserSearch(
    @Query('name') name: string,
    @Query('age') age: string
  ): string {
    return `User with name: ${name}, and age: ${age}`
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): string {
    if (id === 0) {
      throw new NotFoundException('Поле id не может быть 0')
    }

    return `User with ID : ${id}`
  }

  @Post()
  create(@Body() body: any){
    if (!body.name) {
      throw new NotFoundException('User no valid: no name field')
    }

    return {
      message: 'Пользователь создан',
      data: body
    }
  }

}
