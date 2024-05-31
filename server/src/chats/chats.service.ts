import { BadRequestException, Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';
import { AddMessageDto } from './dto/add-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';
import { CreateChatDto } from './dto/create-chat-dto';
import { User } from 'src/users/users.model';
import { Message } from 'src/messages/messages.model';
import { MusiciansService } from 'src/musicians/musicians.service';

export interface ChatsUserInfo {
  userId: number;
  name: string;
  mainRole: string;
  avatarUrl: string;
}

@Injectable()
export class ChatsService {
  pusher: Pusher;

  constructor(
    @InjectModel(Chat) private chatsRepository: typeof Chat,
    private messagesService: MessagesService,
    private usersService: UsersService,
    private musiciansService: MusiciansService,
  ) {
    this.pusher = new Pusher({
      appId: '1809143',
      key: '120f0216e88b902b0e81',
      secret: '3806ac330ec24ff81f5b',
      cluster: 'eu',
      useTLS: true,
    });
  }

  async findById(id: number) {
    const chat = await this.chatsRepository.findByPk(id, {
      include: [
        { model: User, attributes: ['id'], through: { attributes: [] } },
      ],
    });
    if (!chat) {
      throw new BadRequestException('There is no chat with such id');
    }
    return chat;
  }

  async createChat(createChatDto: CreateChatDto) {
    const promises: Promise<User>[] = createChatDto.users.map((userId) =>
      this.usersService.findById(userId),
    );

    const users: User[] = await Promise.all(promises);

    const chat = await this.chatsRepository.create({ users });

    await chat.$add('users', users);
    return chat;
  }

  async addMessageToChat(chatId: number, addMessageDto: AddMessageDto) {
    const { senderId, content } = addMessageDto;
    const chat = await this.findById(chatId);

    const message = await this.messagesService.createMessage({
      chatId,
      senderId,
      content,
    });

    const chatName = this.generateChatName(chat.users);

    const data = {
      content,
      senderId: senderId,
      chatId: chat.id,
      createdAt: message.createdAt,
    };

    console.log(chatName, JSON.stringify(data));
    await this.pusher.trigger(chatName, 'message', data);

    return data;
  }

  private generateChatName(users: User[]) {
    let chatName = 'chat';
    const ids = users.map((user) => user.id);
    ids.sort((a, b) => a - b).forEach((id) => (chatName += `-${id}`));

    return chatName;
  }

  async findAll() {
    const allChats = await this.chatsRepository.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: Message,
          attributes: ['content', 'createdAt', 'senderId'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    const flattedChats = allChats.map((chat) => {
      const usersId = chat.users.map((user) => user.id);

      return { id: chat.id, users: usersId, messages: chat.messages };
    });

    return flattedChats;
  }

  async getChatsForUser(userId: number) {
    const chats = await this.findAll();

    const filteredChats = chats.filter((chat) => chat.users.includes(userId));

    const resultChats = await Promise.all(
      filteredChats.map(async (chat) => {
        const chatsUsersInfo: ChatsUserInfo[] =
          await this.musiciansService.findChatsFormat(chat.users);

        return { id: chat.id, users: chatsUsersInfo, messages: chat.messages };
      }),
    );
    return resultChats;
  }
}
