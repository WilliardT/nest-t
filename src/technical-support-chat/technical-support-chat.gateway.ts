import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { TechnicalSupportChatService } from './technical-support-chat.service';
import { Socket } from "socket.io";


// https://socket.io/docs/v4/

// Для тестирования подойдут:
// - https://www.postman.com/ — есть встроенная поддержка Socket.IO
// - https://chrome.google.com/webstore/detail/socketio-tester/ — расширение Chrome
// - Простая HTML-страница с socket.io-client

@WebSocketGateway({
  cors: {
    origin: '*', // или конкретный адрес фронта
  }
})

export class TechnicalSupportChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: TechnicalSupportChatService) {}

  handleConnection(client: Socket) {
    console.log('Client connected', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected')
  }
}
