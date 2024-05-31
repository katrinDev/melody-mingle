import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message, MessageCreationAttrs } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async findAll() {
    return this.messageRepository.findAll();
  }

  async createMessage(messageAttrs: MessageCreationAttrs) {
    return this.messageRepository.create(messageAttrs);
  }
}
