import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { v4 as uuidv4 } from 'uuid';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('project'))
  async uploadProject(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
      }),
    )
    project: Express.Multer.File,

    @Req() request: RequestWithUser,
  ) {
    const newFileName =
      project.fieldname + '-' + uuidv4() + extname(project.originalname);

    return await this.projectsService.uploadProject(
      newFileName,
      project.buffer,
      request.user.musicianId,
    );
  }
}
