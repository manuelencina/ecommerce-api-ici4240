import { Inject, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../../domain/shopping-cart.repository';

@Injectable()
export class ShoppingCartUpdaterService {
  public constructor(
    @Inject('ShoppingCartRepository')
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  public async addProduct(productId: string, userId: string, quantity: number) {
    await this.shoppingCartRepository.addProduct(productId, userId, quantity);
  }

  public async updateQuantityPerProduct(
    productId: string,
    userId: string,
    quantity: number,
  ) {
    await this.shoppingCartRepository.updateQuantityPerProduct(
      productId,
      userId,
      quantity,
    );
  }

  public async deleteProduct(productId: string, userId: string) {
    await this.shoppingCartRepository.deleteProduct(productId, userId);
  }
}
