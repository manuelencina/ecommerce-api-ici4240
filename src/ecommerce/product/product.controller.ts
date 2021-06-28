import { ParseUUIDPipe } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductFinderService } from './application/product-finder/product-finder.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  public constructor(
    private readonly productFinderService: ProductFinderService,
  ) {}

  @Get('by-filter/:filter')
  public async getProductsByFilter(@Param('filter') filter: string) {
    const products = await this.productFinderService.getProductByFilter(filter);
    return {
      products,
    };
  }

  @Get(':productId')
  public async getProductById(
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
  ) {
    try {
      const product = await this.productFinderService.getProductById(productId);
      return {
        ...product,
      };
    } catch (error) {
      return { error };
    }
  }

  @Get('by-category/:categoryId')
  public async getProductsByCategoryId(
    @Param('categoryId', new ParseUUIDPipe({ version: '4' }))
    categoryId: string,
  ) {
    const products = await this.productFinderService.get(
      categoryId,
      'category_id',
    );
    return {
      products,
    };
  }

  @Get('by-brand/:brandId')
  public async getProductsByBrandId(
    @Param('brandId', new ParseUUIDPipe({ version: '4' }))
    brandId: string,
  ) {
    const products = await this.productFinderService.get(brandId, 'brand_id');
    return {
      products,
    };
  }
}
