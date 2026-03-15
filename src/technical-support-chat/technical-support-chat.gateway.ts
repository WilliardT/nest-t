import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { TechnicalSupportChatService } from './technical-support-chat.service';
import { Server, Socket } from "socket.io";
import { SendMessageDto } from "./dto/send-message.dto";


// https://socket.io/docs/v4/

// Для тестирования подойдут:
// - https://www.postman.com/ — есть встроенная поддержка Socket.IO
// - https://chrome.google.com/webstore/detail/socketio-tester/ — расширение Chrome
// - Простая HTML-страница с socket.io-client

@WebSocketGateway(3001, {
  cors: {
    origin: '*', // или конкретный адрес фронта
  }
})

export class TechnicalSupportChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(private readonly chatService: TechnicalSupportChatService) {}

  handleConnection(client: Socket) {
    console.log('Client connected', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected')
  }

  // пока без авторизации
  @SubscribeMessage('send')
  async handleMessage(@MessageBody() dto: SendMessageDto ) {
    const message = await this.chatService.sendMessage(dto)

    this.server.emit('messages', message)

    return message
  }
}
