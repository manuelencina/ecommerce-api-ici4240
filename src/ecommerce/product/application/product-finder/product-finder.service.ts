import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product-repository';

@Injectable()
export class ProductFinderService {
  public constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async get(categoryId: string) {
    try {
      return await this.productRepository.get(categoryId);
    } catch (error) {
      if (error.message === '22P02') {
        return {
          status: 400,
          message: 'invalid category id',
        };
      }
      return {
        status: error.getStatus(),
        message: error.getResponse(),
      };
    }
  }
}
