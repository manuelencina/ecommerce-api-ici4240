import { Inject, Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../../domain/shopping-cart.repository';

@Injectable()
export class ShoppingCartUpdaterService {
  public constructor(
    @Inject('ShoppingCartRepository')
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  public async addProduct(productId: string, cartId: string, quantity: number) {
    await this.shoppingCartRepository.addProduct(productId, cartId, quantity);
  }
  public async updateQuantityPerProduct(cartId: string, quantity: number) {
    await this.shoppingCartRepository.updateQuantityPerProduct(
      cartId,
      quantity,
    );
  }

  public async deleteProduct(productId: string, cartId: string) {
    await this.shoppingCartRepository.deleteProduct(productId, cartId);
  }
}
