import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entity";
import { TechnicalSupportChatService } from './technical-support-chat.service';
import { TechnicalSupportChatGateway } from './technical-support-chat.gateway';


@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [TechnicalSupportChatGateway, TechnicalSupportChatService],
})
export class TechnicalSupportChatModule {}
