import { Controller, Param, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './projects.model';
import { GetProjectResponse } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Получение всех проектов музыканта' })
  @Get(':musicianId')
  async findByMusician(
    @Param('musicianId') musicianId: number,
  ): Promise<GetProjectResponse[]> {
    return this.projectsService.findByMusician(musicianId);
  }
}
