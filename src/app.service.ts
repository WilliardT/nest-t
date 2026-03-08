import { Injectable } from '@nestjs/common';

// Сервивы роль класса где выполняется логика
// что будет происходить по переходу определенного маршрута
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
