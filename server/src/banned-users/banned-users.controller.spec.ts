import { Test, TestingModule } from '@nestjs/testing';
import { BannedUsersController } from './banned-users.controller';

describe('BannedUsersController', () => {
  let controller: BannedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannedUsersController],
    }).compile();

    controller = module.get<BannedUsersController>(BannedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
