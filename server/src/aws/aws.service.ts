import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {}

  BUCKET_NAME = this.configService.get('AWS_BUCKET_NAME');

  s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    region: this.configService.get('AWS_S3_REGION'),
  });

  createFileUrl(fileName: string) {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
  }

  async uploadPublicFile(data: Buffer, fileName: string) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.BUCKET_NAME,
          Body: data,
          Key: fileName,
          ContentDisposition: 'inline',
        })
        .promise();

      return uploadResult;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Не удалось загрузить файл',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async deletePublicFile(fileName: string) {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.BUCKET_NAME,
          Key: fileName,
        })
        .promise();
    } catch (error) {
      throw new HttpException('Не удалось удалить файл', HttpStatus.FORBIDDEN);
    }
  }
}
