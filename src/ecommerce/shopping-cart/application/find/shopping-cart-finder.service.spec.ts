import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartFinderService } from './shopping-cart-finder.service';

describe('ShoppingCartFinderService', () => {
  let service: ShoppingCartFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartFinderService],
    }).compile();

    service = module.get<ShoppingCartFinderService>(ShoppingCartFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
