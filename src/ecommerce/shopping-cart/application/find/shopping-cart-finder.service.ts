import { Inject, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../../domain/shopping-cart.repository';

@Injectable()
export class ShoppingCartFinderService {
  public constructor(
    @Inject('ShoppingCartRepository')
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  public async get(userId: string) {
    return await this.shoppingCartRepository.get(userId);
  }
}
