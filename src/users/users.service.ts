import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from "./dto/update-users.dto";

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
    const { name, bio } = body

    const user: UserEntity = this.userRepository.create({
      name,
      bio: bio || undefined
    });

    return this.userRepository.save(user);
  }

  async updateUser(id: number, body: UpdateUsersDto) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`);
    }

    if (body.name) {
      user.name = body.name;
    }

    if (body.bio) {
      user.bio = body.bio;
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
