import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProfilesInfoModule } from 'src/profiles-info/profiles-info.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    SequelizeModule.forFeature([Project]),
    AwsModule,
    ProfilesInfoModule,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
