import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product-repository';

@Injectable()
export class ProductFinderService {
  public constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async get(criteriaId: string, criteriaType: string) {
    try {
      return await this.productRepository.get(criteriaId, criteriaType);
    } catch (error) {
      if (error.message === '22P02') {
        return {
          status: 400,
          message: 'invalid category id',
        };
      }
      return {
        error,
      };
    }
  }

  public async getProductById(productId: string) {
    return await this.productRepository.getProductById(productId);
  }
}
