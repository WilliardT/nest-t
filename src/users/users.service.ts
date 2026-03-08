import {Injectable, NotFoundException} from '@nestjs/common';

// сервис - Бизнес логика
@Injectable()
export class UsersService {
  // модификатор доступа private (доступен только внутри данного класса)
  private users = [
    { id: 1, name: 'Ivan' },
    { id: 2, name: 'Alex' }
  ]

  getAllUsers(): { id: number, name: string }[] {
    return this.users
  }

  getUserById(id: number) {
    const user = this.users.find(user => {
      user.id === id;
    })

    if (!user) {
      throw new NotFoundException(`user с ${id} не найден`)
    }

    return user;
  }

  createUser(name: string) {
    const newUser = {
      id: this.users.length + 1,
      name: name
    }

    this.users.push(newUser);

    return newUser;
  }
}
