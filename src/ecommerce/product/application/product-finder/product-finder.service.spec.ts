import { Test, TestingModule } from '@nestjs/testing';
import { ProductFinderService } from './product-finder.service';

describe('ProductFinderService', () => {
  let service: ProductFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFinderService],
    }).compile();

    service = module.get<ProductFinderService>(ProductFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
