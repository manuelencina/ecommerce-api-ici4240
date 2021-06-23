import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryFinderService } from './application/find/category-finder.service';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryFinder: CategoryFinderService) {}

  @Get()
  public async getCategories() {
    try {
      const categories = await this.categoryFinder.get();
      return {
        categories,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
