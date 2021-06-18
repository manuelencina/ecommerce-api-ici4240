import { Delete, Put } from '@nestjs/common';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ShoppingCartUpdaterService } from './application/update/shopping-cart-updater.service';

interface ProductDto {
  productId: string;
  cartId: string;
  quantity: number;
}

@Controller('shopping-cart')
export class ShoppingCartController {
  public constructor(
    private readonly shoppingCartUpdater: ShoppingCartUpdaterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addProduct(@Body() body: ProductDto) {
    await this.shoppingCartUpdater.addProduct(
      body.productId,
      body.cartId,
      body.quantity,
    );
    return {
      productId: body.productId,
      cartId: body.cartId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async updateQuantityPerProduct(@Body() body: ProductDto) {
    await this.shoppingCartUpdater.updateQuantityPerProduct(
      body.cartId,
      body.quantity,
    );
    return {
      productId: body.productId,
      cartId: body.cartId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async deleteProduct(@Body() body: ProductDto) {
    await this.shoppingCartUpdater.deleteProduct(body.productId, body.cartId);
    return {
      body,
    };
  }
}
