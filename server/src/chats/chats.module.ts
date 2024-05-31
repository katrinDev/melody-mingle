import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { UserChats } from './user-chats.model';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';
import { MusiciansModule } from 'src/musicians/musicians.module';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [
    SequelizeModule.forFeature([Chat, UserChats]),
    MessagesModule,
    UsersModule,
    MusiciansModule,
  ],
})
export class ChatsModule {}
