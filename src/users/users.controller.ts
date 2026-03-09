import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { AuthGuard } from "./auth.guard";
import {UpdateUsersDto} from "./dto/update-users.dto";


// порядок следования важен - видимость и реакция url на выдачу
@Controller('users')
export class UsersController {
  // необходимо зарегистрировать сервис
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)   // guards работает после pipes до controller
  getUserById(@Param('id', ParseIntPipe) id: number) {  // Pipes — ParseIntPipe преобразование данных и валидация
    return this.userService.getUserById(id);
  }

  @Post()
  create(@Body() body: CreateUsersDto) {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsersDto
  ) {
    return this.userService.updateUser(id, body);
  }

}
