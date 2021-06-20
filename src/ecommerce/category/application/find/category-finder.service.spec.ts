import { Test, TestingModule } from '@nestjs/testing';
import { CategoryFinderService } from './category-finder.service';

describe('CategoryFinderService', () => {
  let service: CategoryFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryFinderService],
    }).compile();

    service = module.get<CategoryFinderService>(CategoryFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
