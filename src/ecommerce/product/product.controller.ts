import { ParseUUIDPipe } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ProductFinderService } from './application/product-finder/product-finder.service';

@Controller('products')
export class ProductController {
  public constructor(
    private readonly productfinderService: ProductFinderService,
  ) {}

  @Get('by-category/:criteriaId')
  public async getProductsByCategoryId(
    @Param('criteriaId', new ParseUUIDPipe({ version: '4' }))
    criteriaId: string,
  ) {
    const products = await this.productfinderService.get(
      criteriaId,
      'category_id',
    );
    return {
      products,
    };
  }

  @Get('by-brand/:criteriaId')
  public async getProductsByBrandId(
    @Param('criteriaId', new ParseUUIDPipe({ version: '4' }))
    criteriaId: string,
  ) {
    const products = await this.productfinderService.get(
      criteriaId,
      'brand_id',
    );
    return {
      products,
    };
  }
}
