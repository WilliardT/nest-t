import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUsersDto} from "./create-users.dto";

// сервис - Бизнес логика
@Injectable()
export class UsersService {
  // модификатор доступа private (доступен только внутри данного класса)
  private users = [
    { id: 1, name: 'Ivan', bio: 'some info' },
    { id: 2, name: 'Alex', bio: 'some info' }
  ]

  getAllUsers(): { id: number, name: string, bio: string }[] {
    return this.users
  }

  getUserById(id: number) {
    const user = this.users.find(user => {
      return user.id === id;
    })

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`)
    }

    return user;
  }

  createUser(body: CreateUsersDto) {
    const newUser = {
      id: this.users.length + 1,
      name: body.name,
      bio: body.bio
    }

    this.users.push(newUser);

    return newUser;
  }
}
