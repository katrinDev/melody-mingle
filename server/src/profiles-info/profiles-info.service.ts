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

@Injectable()
export class ProfilesInfoService {
  constructor(
    @InjectModel(ProfileInfo) private profileInfoRepository: typeof ProfileInfo,
    private readonly configService: ConfigService,
  ) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  async uploadAvatar(fileName: string, file: Buffer, musicianId: number) {
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
}
