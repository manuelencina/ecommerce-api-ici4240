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

  @Get(':productId')
  public async getProductById(
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
  ) {
    try {
      const product = await this.productFinderService.getProductById(productId);
      return {
        product,
      };
    } catch (error) {
      return { error };
    }
  }

  @Get('by-category/:criteriaId')
  public async getProductsByCategoryId(
    @Param('criteriaId', new ParseUUIDPipe({ version: '4' }))
    criteriaId: string,
  ) {
    const products = await this.productFinderService.get(
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
    const products = await this.productFinderService.get(
      criteriaId,
      'brand_id',
    );
    return {
      products,
    };
  }
}
