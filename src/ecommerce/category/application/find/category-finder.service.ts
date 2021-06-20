import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/category-repository';

@Injectable()
export class CategoryFinderService {
  public constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async get() {
    return await this.categoryRepository.get();
  }
}
