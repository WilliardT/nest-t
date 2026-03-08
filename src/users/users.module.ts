import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { UsersService}  from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService] // использование не только внутри модуля, но и в других
})

export class UsersModule {}
