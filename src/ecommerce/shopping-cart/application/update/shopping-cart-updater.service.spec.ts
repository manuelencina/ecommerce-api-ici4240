import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartUpdaterService } from './shopping-cart-updater.service';

describe('ShoppingCartUpdaterService', () => {
  let service: ShoppingCartUpdaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartUpdaterService],
    }).compile();

    service = module.get<ShoppingCartUpdaterService>(ShoppingCartUpdaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
