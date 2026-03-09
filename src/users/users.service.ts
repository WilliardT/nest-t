import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import {UpdateUsersDto} from "./dto/update-users.dto";

// сервис - Бизнес логика
@Injectable()
export class UsersService {
  // модификатор доступа private (доступен только внутри данного класса)
  // private users = [
  //   { id: 1, name: 'Ivan', bio: 'some info' },
  //   { id: 2, name: 'Alex', bio: 'some info' }
  // ]

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user: UserEntity | null = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`);
    }

    return user;
  }

  createUser(body: CreateUsersDto) {
    const name = body.name;
    const bio = body.bio;

    const user: UserEntity = this.userRepository.create({ name, bio });

    return this.userRepository.save(user);
  }

  async updateUser(id: number, dto: UpdateUsersDto) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`);
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.bio) {
      user.bio = dto.bio;
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`);
    }

    return this.userRepository.remove(user);
  }

}
