import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Musician } from './musicians.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateMusicianDto } from './dto/create-musician.dto';

@ApiTags('Музыканты')
@Controller('musicians')
export class MusiciansController {
  constructor(private musiciansService: MusiciansService) {}

  @ApiOperation({ summary: 'Просмотр всех музыкантов' })
  @ApiResponse({ status: 200, type: [Musician] })
  @Get()
  async findAll(): Promise<Musician[]> {
    return this.musiciansService.findAll();
  }

  @ApiOperation({ summary: 'Получение 1 музыканта по ID пользователя' })
  @ApiResponse({ status: 200, type: Musician })
  @Get('/user/:id')
  async findByUserId(@Param('id') id: number) {
    return this.musiciansService.findByUserId(id);
  }

  @ApiOperation({ summary: 'Создание музыканта' })
  @ApiResponse({ status: 200, type: Musician })
  @UsePipes(ValidationPipe)
  @Post()
  async createMusician(
    @Body() musicianDto: CreateMusicianDto,
  ): Promise<Musician> {
    return this.musiciansService.createMusician(musicianDto);
  }

  @ApiOperation({ summary: 'Удаление музыканта' })
  @ApiResponse({ status: 200, type: Musician })
  @Delete(':id')
  async deleteMusician(@Param('id') id: number) {
    return this.musiciansService.deleteMusician(id);
  }

  @ApiOperation({ summary: 'Получение 1 музыканта' })
  @ApiResponse({ status: 200, type: Musician })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.musiciansService.findById(id);
  }
}
