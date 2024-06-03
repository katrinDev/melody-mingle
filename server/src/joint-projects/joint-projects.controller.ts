import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { JointProjectsService } from './joint-projects.service';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { CreateJointProjectDto } from './dto/create-joint-dto';
import { AddChunkDto } from './dto/add-chunk-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('joint-projects')
export class JointProjectsController {
  constructor(private jointProjectsService: JointProjectsService) {}

  @Get('/by-musician')
  async findAllByMusicianId(@Req() request: RequestWithUser) {
    return this.jointProjectsService.getJointsForMusician(
      request.user.musicianId,
    );
  }

  @Post()
  async createJointProject(@Body() createJointDto: CreateJointProjectDto) {
    return this.jointProjectsService.createJointProject(createJointDto);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('audio'))
  async addSongChunk(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'audio/mpeg' || 'audio/wav' || 'audio/ogg',
          }),
        ],
      }),
    )
    audio: Express.Multer.File,
    @Body() addChunkDto: AddChunkDto,
    @Param('id') id: number,
  ) {
    const newFileName =
      audio.fieldname + '-' + uuidv4() + extname(audio.originalname);

    return this.jointProjectsService.addSongChunk(
      addChunkDto,
      newFileName,
      audio.buffer,
      id,
    );
  }

  @Get('count')
  async getJointsCount(@Req() req: RequestWithUser) {
    return this.jointProjectsService.getJointsCount(req.user.musicianId);
  }
}
