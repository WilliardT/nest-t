import { Injectable } from '@nestjs/common';

// что будет происходить по переходу определенного маршрута
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
