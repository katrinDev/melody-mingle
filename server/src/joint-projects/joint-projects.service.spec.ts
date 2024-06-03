import { Test, TestingModule } from '@nestjs/testing';
import { JointProjectsService } from './joint-projects.service';

describe('JointProjectsService', () => {
  let service: JointProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JointProjectsService],
    }).compile();

    service = module.get<JointProjectsService>(JointProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
