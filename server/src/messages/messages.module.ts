import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';

@Module({
  providers: [MessagesService],
  imports: [SequelizeModule.forFeature([Message])],
  exports: [MessagesService],
})
export class MessagesModule {}
