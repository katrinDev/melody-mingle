import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
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
import { UpdateBioDto } from './dto/update-bio.dto';

@Controller('profiles-info')
export class ProfilesInfoController {
  constructor(private readonly profileInfoService: ProfilesInfoService) {}

  @Get()
  async getProfileInfo(@Req() request: RequestWithUser) {
    return this.profileInfoService.getProfileInfo(request.user.musicianId);
  }

  @Post('bio')
  async updateBio(
    @Body() bioDto: UpdateBioDto,
    @Req() request: RequestWithUser,
  ) {
    return this.profileInfoService.updateBio(
      bioDto.bio,
      request.user.musicianId,
    );
  }

  @Post('avatar')
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
    avatar: Express.Multer.File,

    @Req() request: RequestWithUser,
  ) {
    const newFileName =
      avatar.fieldname + '-' + uuidv4() + extname(avatar.originalname);

    return await this.profileInfoService.uploadAvatar(
      newFileName,
      avatar.buffer,
      request.user.musicianId,
    );
  }

  @Get(':musicianId')
  async findOneByMusicianId(@Param('musicianId') musicianId: number) {
    return this.profileInfoService.getProfileInfo(musicianId);
  }

  @Delete('avatar')
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.profileInfoService.deleteAvatar(request.user.musicianId);
  }
}
