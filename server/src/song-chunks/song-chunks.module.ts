import { Module } from '@nestjs/common';
import { SongChunksService } from './song-chunks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SongChunk } from './song-chunks.model';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  providers: [SongChunksService],
  imports: [SequelizeModule.forFeature([SongChunk]), AwsModule],
  exports: [SongChunksService],
})
export class SongChunksModule {}
