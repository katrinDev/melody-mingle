import { Test, TestingModule } from '@nestjs/testing';
import { MusiciansService } from './musicians.service';

describe('MusiciansService', () => {
  let service: MusiciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusiciansService],
    }).compile();

    service = module.get<MusiciansService>(MusiciansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
