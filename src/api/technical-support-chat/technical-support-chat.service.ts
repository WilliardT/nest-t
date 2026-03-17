import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "./entities/message.entity";
import { SendMessageDto } from "./dto/send-message.dto";


@Injectable()
export class TechnicalSupportChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  async sendMessage(dto: SendMessageDto): Promise<MessageEntity> {
    const { text } = dto

    const message = this.messageRepository.create({ text })

    return this.messageRepository.save(message)
  }
}
