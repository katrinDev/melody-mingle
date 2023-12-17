import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './projects.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProfilesInfoService } from 'src/profiles-info/profiles-info.service';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private profileService: ProfilesInfoService,
    private awsService: AwsService,
  ) {}

  async uploadProject(fileName: string, data: Buffer, musicianId: number) {
    try {
      await this.profileService.checkMusician(musicianId);

      const uploadResult = await this.awsService.uploadPublicFile(
        data,
        fileName,
      );

      const newProjectObject = {
        projectKey: uploadResult.Key,
        musicianId,
      };

      await this.projectRepository.create(newProjectObject);

      const projectUrl = this.awsService.createFileUrl(fileName);

      return {
        musicianId,
        projectUrl,
      };
    } catch (error) {
      throw new HttpException(
        'Не удалось загрузить проект',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
