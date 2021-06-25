import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdaterService } from './user-updater.service';

describe('UserUpdaterService', () => {
  let service: UserUpdaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdaterService],
    }).compile();

    service = module.get<UserUpdaterService>(UserUpdaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
