import {
  Controller,
  Param,
  Get,
  Post,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  FileTypeValidator,
  Body,
  Req,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ProjectsService } from './projects.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './projects.model';
import { GetProjectResponse } from './projects.service';
import { AddProjectDto } from './dto/add-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { extname } from 'path';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Получение всех проектов музыканта' })
  @Get(':musicianId')
  async findByMusician(
    @Param('musicianId') musicianId: number,
  ): Promise<GetProjectResponse[]> {
    return this.projectsService.findByMusician(musicianId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('project'))
  async addProject(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'audio/mpeg' || 'audio/wav' || 'audio/ogg' || 'audio/mp3',
          }),
        ],
      }),
    )
    project: Express.Multer.File,
    @Body() addProjectDto: AddProjectDto,
    @Req() req: RequestWithUser,
  ) {
    const newFileName =
      project.fieldname + '-' + uuidv4() + extname(project.originalname);

    return this.projectsService.addProject(
      addProjectDto,
      newFileName,
      project.buffer,
      req.user.musicianId,
    );
  }
}
