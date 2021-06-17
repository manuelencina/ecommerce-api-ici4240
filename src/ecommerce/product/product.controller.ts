import { Body, Controller, Get } from '@nestjs/common';
import { ProductFinderService } from './application/product-finder/product-finder.service';
import { ProductsByCategoryIdDto } from './dto/products-by-category-id.dto';

@Controller('products')
export class ProductController {
  public constructor(
    private readonly productfinderService: ProductFinderService,
  ) {}

  @Get()
  public async getProducts(@Body() body: ProductsByCategoryIdDto) {
    const products = await this.productfinderService.get(body.categoryId);
    return {
      products,
    };
  }
}
