import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SongChunk, SongChunkCreationAttrs } from './song-chunks.model';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class SongChunksService {
  constructor(
    @InjectModel(SongChunk) private songChunkRepository: typeof SongChunk,
    private awsService: AwsService,
  ) {}

  getChunksWithUrl(chunks: SongChunk[]) {
    const songChunksWithUrl = chunks.map((chunk) => {
      const plainChunk = chunk.get({ plain: true });
      const audioUrl = this.awsService.createFileUrl(plainChunk.chunkKey);
      delete plainChunk.chunkKey;

      return {
        ...plainChunk,
        audioUrl,
      };
    });

    return songChunksWithUrl;
  }

  async findAll() {
    return this.songChunkRepository.findAll();
  }

  async createSongChunk(songChunkAttrs: SongChunkCreationAttrs) {
    return this.songChunkRepository.create(songChunkAttrs);
  }
}
