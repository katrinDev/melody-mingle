import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateChatDto } from './dto/create-chat-dto';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { Public } from 'src/guards/decorators/public.decorator';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get('/by-user')
  async findAllByUserId(@Req() request: RequestWithUser) {
    return this.chatsService.getChatsForUser(request.user.id);
  }

  @Get('/count')
  async getChatsCount(@Req() request: RequestWithUser) {
    return this.chatsService.getChatsCount(request.user.id);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chatsService.findById(id);
  }

  @Public()
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Post(':id')
  async addMessageToChat(
    @Body() addMessageDto: AddMessageDto,
    @Param('id') id: number,
  ) {
    return this.chatsService.addMessageToChat(id, addMessageDto);
  }
}
