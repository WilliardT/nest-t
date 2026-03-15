import { Module } from '@nestjs/common';
import { TechnicalSupportChatService } from './technical-support-chat.service';
import { TechnicalSupportChatGateway } from './technical-support-chat.gateway';


@Module({
  providers: [TechnicalSupportChatGateway, TechnicalSupportChatService],
})
export class TechnicalSupportChatModule {}
