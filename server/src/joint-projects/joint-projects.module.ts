import { Module } from '@nestjs/common';
import { JointProjectsController } from './joint-projects.controller';
import { JointProjectsService } from './joint-projects.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { JointProject } from './joint-projects.model';
import { MusicianJoints } from './musician-joints.model';
import { SongChunksModule } from 'src/song-chunks/song-chunks.module';
import { MusiciansModule } from 'src/musicians/musicians.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [JointProjectsController],
  providers: [JointProjectsService],
  imports: [
    SequelizeModule.forFeature([JointProject, MusicianJoints]),
    SongChunksModule,
    MusiciansModule,
    AwsModule,
  ],
  exports: [JointProjectsService],
})
export class JointProjectsModule {}
