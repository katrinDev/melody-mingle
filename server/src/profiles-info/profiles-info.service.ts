import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfileInfo } from './profiles-info.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { MusiciansService } from 'src/musicians/musicians.service';

@Injectable()
export class ProfilesInfoService {
  constructor(
    @InjectModel(ProfileInfo) private profileInfoRepository: typeof ProfileInfo,
    private readonly configService: ConfigService,
    private musiciansService: MusiciansService,
  ) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

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

  async uploadAvatar(fileName: string, file: Buffer, musicianId: number) {
    await this.checkMusician(musicianId);

    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `avatars/${fileName}`,
        Body: file,
        ACL: 'public-read',
      }),
    );

    const oldProfileInfo = await this.profileInfoRepository.findOne({
      where: { musicianId },
    });

    const newInfoObj = {
      avatarKey: fileName,
      musicianId,
    };

    let updatedProfileInfo: ProfileInfo;

    if (!oldProfileInfo) {
      updatedProfileInfo = await this.profileInfoRepository.create(newInfoObj);
    } else {
      updatedProfileInfo = await oldProfileInfo.update(newInfoObj);

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: `avatars/${oldProfileInfo.avatarKey}`,
        }),
      );
    }

    const avatarUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/avatars/${updatedProfileInfo.avatarKey}`;

    return {
      musicianId: updatedProfileInfo.musicianId,
      url: avatarUrl,
    };
  }

  async checkMusician(musicianId: number) {
    const musician = await this.musiciansService.findById(musicianId);

    if (!musician) {
      throw new NotFoundException('Музыкант не найден');
    }
  }
}
