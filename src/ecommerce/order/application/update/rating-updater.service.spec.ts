import { Test, TestingModule } from '@nestjs/testing';
import { RatingUpdaterService } from './rating-updater.service';

describe('RatingUpdaterService', () => {
  let service: RatingUpdaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingUpdaterService],
    }).compile();

    service = module.get<RatingUpdaterService>(RatingUpdaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
