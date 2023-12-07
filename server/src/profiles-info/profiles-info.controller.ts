import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { extname } from 'path';
import { Express } from 'express';
import { ProfilesInfoService } from './profiles-info.service';

@Controller('profiles-info')
export class ProfilesInfoController {
  constructor(private readonly profileInfoService: ProfilesInfoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 3000 * 1000 }),
        ],
      }),
    )
    file: Express.Multer.File,

    @Req() request: RequestWithUser,
  ) {
    const newFileName =
      file.fieldname + '-' + uuidv4() + extname(file.originalname);

    const uploadedInfo = await this.profileInfoService.uploadAvatar(
      newFileName,
      file.buffer,
      request.user.musicianId,
    );

    return {
      uploadedInfo,
    };
  }
}
