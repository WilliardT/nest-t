import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from "./dto/update-users.dto";


// порядок следования важен - видимость и реакция url на выдачу
@Controller('users_entity')
export class UsersController {
  // необходимо зарегистрировать сервис
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  //@UseGuards(AuthGuard)   // guards работает после pipes до controller
  getUserById(@Param('id', ParseIntPipe) id: number) {  // Pipes — ParseIntPipe преобразование данных и валидация
    return this.userService.getUserById(id);
  }

  @Post()
  create(@Body() body: CreateUsersDto) {
    return this.userService.createUser(body);
  }

  // patchUpdate
  @Patch(':id') // частичное обновление
  // @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsersDto // Partial<UpdateUsersDto>
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.userService.deleteUser(id);
  }

}
