import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { AwsService } from '../aws/aws.service';
import { AddProjectDto } from './dto/add-project.dto';

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

  async addProject(
    addProjectDto: AddProjectDto,
    fileName: string,
    project: Buffer,
    musicianId: number,
  ): Promise<GetProjectResponse> {
    try {
      const uploadResult = await this.awsService.uploadPublicFile(
        project,
        fileName,
      );

      const newProject = await this.projectRepository.create({
        ...addProjectDto,
        musicianId,
        projectKey: uploadResult.Key,
      });

      const projectPlain = newProject.get({ plain: true });
      delete projectPlain.projectKey;

      return {
        ...projectPlain,
        projectUrl: uploadResult.Location,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Не удалось добавить проект',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
