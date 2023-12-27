import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfileInfo } from './profiles-info.model';
import { InjectModel } from '@nestjs/sequelize';
import { MusiciansService } from 'src/musicians/musicians.service';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class ProfilesInfoService {
  constructor(
    @InjectModel(ProfileInfo) private profileInfoRepository: typeof ProfileInfo,
    private readonly configService: ConfigService,
    private musiciansService: MusiciansService,
    private awsService: AwsService,
  ) {}

  async getProfileInfo(musicianId: number) {
    await this.checkMusician(musicianId);

    const profileInfo = await this.profileInfoRepository.findOne({
      where: { musicianId },
    });

    const url = this.awsService.createFileUrl(profileInfo.avatarKey);

    return {
      bio: profileInfo.bio,
      avatarUrl: url,
    };
  }

  async updateBio(bio: string, musicianId: number) {
    await this.checkMusician(musicianId);

    const oldProfileInfo = await this.profileInfoRepository.findOne({
      where: {
        musicianId,
      },
    });

    const newInfoObj = {
      bio,
      musicianId,
    };

    let updatedProfileInfo: ProfileInfo;

    if (!oldProfileInfo) {
      updatedProfileInfo = await this.profileInfoRepository.create(newInfoObj);
    } else {
      updatedProfileInfo = await oldProfileInfo.update(newInfoObj);
    }

    return updatedProfileInfo;
  }

  async uploadAvatar(fileName: string, data: Buffer, musicianId: number) {
    try {
      await this.checkMusician(musicianId);

      const uploadResult = this.awsService.uploadPublicFile(data, fileName);

      const oldProfileInfo = await this.profileInfoRepository.findOne({
        where: {
          musicianId,
        },
      });

      const newInfoObj = {
        avatarKey: fileName,
        musicianId,
      };

      let updatedProfileInfo: ProfileInfo;

      if (!oldProfileInfo) {
        updatedProfileInfo = await this.profileInfoRepository.create(
          newInfoObj,
        );
      } else {
        updatedProfileInfo = await oldProfileInfo.update(newInfoObj);

        await this.awsService.deletePublicFile(oldProfileInfo.avatarKey);
      }

      const avatarUrl = this.awsService.createFileUrl(fileName);

      return {
        musicianId: updatedProfileInfo.musicianId,
        avatarUrl,
      };
    } catch (error) {
      throw new HttpException(
        'Не удалось изменить фото профиля',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAvatar(musicianId: number) {
    await this.checkMusician(musicianId);

    const profileInfo = await this.profileInfoRepository.findOne({
      where: { musicianId },
    });

    if (!profileInfo.avatarKey) {
      throw new NotFoundException('Фото профиля еще не было добавлено');
    }

    await this.awsService.deletePublicFile(profileInfo.avatarKey);

    profileInfo.avatarKey = null;
    await profileInfo.save();
    await profileInfo.reload();

    return profileInfo;
  }

  async deleteBio(musicianId: number) {
    await this.checkMusician(musicianId);

    const profileInfo = await this.profileInfoRepository.findOne({
      where: { musicianId },
    });

    if (!profileInfo.bio) {
      throw new NotFoundException('Описание еще не было добавлено');
    }

    profileInfo.bio = null;
    await profileInfo.save();
    await profileInfo.reload();

    return profileInfo;
  }

  async checkMusician(musicianId: number) {
    const musician = await this.musiciansService.findById(musicianId);

    if (!musician) {
      throw new NotFoundException('Музыкант не найден');
    }
  }
}
