import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateChatDto } from './dto/create-chat-dto';
import RequestWithUser from 'src/auth/IRequestWithUser';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get('/by-user')
  async findAllByUserId(@Req() request: RequestWithUser) {
    return this.chatsService.getChatsForUser(request.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chatsService.findById(id);
  }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Post(':id/messages')
  async messages(
    @Body() addMessageDto: AddMessageDto,
    @Param('id') id: number,
  ) {
    return this.chatsService.addMessageToChat(id, addMessageDto);
  }
}
