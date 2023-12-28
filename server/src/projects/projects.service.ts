import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { AwsService } from '../aws/aws.service';

export interface GetProjectResponse {
  id: number;
  projectUrl: string;
  projectName: string;
  performer: string;
  description: string;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private awsService: AwsService,
  ) {}

  async findByMusician(musicianId: number): Promise<GetProjectResponse[]> {
    const projects = await this.projectRepository.findAll({
      where: { musicianId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    const projectsWithUrl = projects.map((project) => {
      let plainProject = project.get({ plain: true });

      let projectUrl = this.awsService.createFileUrl(plainProject.projectKey);
      delete plainProject.projectKey;

      return {
        ...plainProject,
        projectUrl,
      };
    });

    return projectsWithUrl;
  }
}
