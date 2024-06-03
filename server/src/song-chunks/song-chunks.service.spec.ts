import { Test, TestingModule } from '@nestjs/testing';
import { SongChunksService } from './song-chunks.service';

describe('SongChunksService', () => {
  let service: SongChunksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongChunksService],
    }).compile();

    service = module.get<SongChunksService>(SongChunksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
