import { Test, TestingModule } from '@nestjs/testing';
import { OrderFinderService } from './order-finder.service';

describe('OrderFinderService', () => {
  let service: OrderFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderFinderService],
    }).compile();

    service = module.get<OrderFinderService>(OrderFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
