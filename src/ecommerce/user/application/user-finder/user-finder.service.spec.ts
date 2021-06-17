import { Test, TestingModule } from '@nestjs/testing';
import { UserFinderService } from './user-finder.service';

describe('UserFinderService', () => {
  let service: UserFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFinderService],
    }).compile();

    service = module.get<UserFinderService>(UserFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
