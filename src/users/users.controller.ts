import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./create-users.dto";


// порядок следования важен - видимость и реакция url на выдачу
@Controller('users')
export class UsersController {
  // необходимо зарегистрировать сервис
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(): { id: number, name: string }[] {
    return this.userService.getAllUsers();
  }

  // @Get('about')
  // getAllUsersAbout(): string {
  //   return 'All users about'
  // }
  //
  // @Get('search')
  // getUserSearch(
  //   @Query('name') name: string,
  //   @Query('age') age: string
  // ): string {
  //   return `User with name: ${name}, and age: ${age}`
  // }

  @Get(':id')
  getUserById(@Param('id') id: string): { id: number, name: string, bio: string } {
    return this.userService.getUserById(Number(id))
  }


  @Post()
  create(@Body() body: CreateUsersDto){
    return this.userService.createUser(body)
  }


  // @Put(':id')
  // update(){
  //   return 'Update user'
  // }
  //
  //
  // @Delete(':id')
  // deleteUser(){
  //   return 'delete User'
  // }

}
