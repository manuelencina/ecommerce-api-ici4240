import { Controller, Get } from '@nestjs/common';
import { CategoryFinderService } from './application/find/category-finder.service';

@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryFinder: CategoryFinderService) {}

  @Get()
  public async get() {
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
