import {
  Delete,
  HttpException,
  Put,
  UsePipes,
  ValidationPipe,
  Res,
  Get,
} from '@nestjs/common';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ProductTrimmerDto } from '../product/dto/product-trimmer.dto';
import { ProductUpdaterDto } from '../product/dto/product-updater.dto';
import { ShoppingCartFinderService } from './application/find/shopping-cart-finder.service';
import { ShoppingCartUpdaterService } from './application/update/shopping-cart-updater.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  public constructor(
    private readonly shoppingCartUpdater: ShoppingCartUpdaterService,
    private readonly shoppingCartFinder: ShoppingCartFinderService,
  ) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(
    @Body() body: ProductUpdaterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const shoppingCart = await this.shoppingCartFinder.get(body.cartId);
      return {
        shoppingCart,
      };
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  public async addProduct(
    @Body() body: ProductUpdaterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.shoppingCartUpdater.addProduct(
        body.productId,
        body.cartId,
        body.quantity,
      );
      return this.generateMessage('product successfully added');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put()
  public async updateQuantityPerProduct(
    @Body() body: ProductUpdaterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      if (body.quantity === 0) {
        await this.shoppingCartUpdater.deleteProduct(
          body.productId,
          body.cartId,
        );
      } else {
        await this.shoppingCartUpdater.updateQuantityPerProduct(
          body.cartId,
          body.quantity,
        );
      }
      return this.generateMessage('shopping cart successfully updated');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Delete()
  public async deleteProduct(
    @Body() body: ProductTrimmerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.shoppingCartUpdater.deleteProduct(body.productId, body.cartId);
      return this.generateMessage('product successfully removed');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  private generateResponseForBadRequest(res: Response, error: HttpException) {
    res.status(error.getStatus());
    return {
      status: error.getStatus(),
      message: error.getResponse(),
    };
  }

  private generateMessage(message: string) {
    return {
      message,
    };
  }
}
