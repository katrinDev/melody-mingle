import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [SequelizeModule.forFeature([Project]), AwsModule],
})
export class ProjectsModule {}
