import { Test, TestingModule } from '@nestjs/testing';
import { OrderCreatorService } from './order-creator.service';

describe('OrderCreatorService', () => {
  let service: OrderCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCreatorService],
    }).compile();

    service = module.get<OrderCreatorService>(OrderCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
