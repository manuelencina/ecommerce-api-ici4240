import {
  Delete,
  HttpException,
  Put,
  UsePipes,
  ValidationPipe,
  Res,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ProductUpdaterDto } from '../product/dto/product-updater.dto';
import { ShoppingCartFinderService } from './application/find/shopping-cart-finder.service';
import { ShoppingCartUpdaterService } from './application/update/shopping-cart-updater.service';

@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  public constructor(
    private readonly shoppingCartUpdater: ShoppingCartUpdaterService,
    private readonly shoppingCartFinder: ShoppingCartFinderService,
  ) {}

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const shoppingCart = await this.shoppingCartFinder.get(String(req.user));
      return {
        products: shoppingCart,
      };
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post(':productId')
  public async addProduct(
    @Body() body: ProductUpdaterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
  ) {
    try {
      await this.shoppingCartUpdater.addProduct(
        productId,
        String(req.user),
        body.quantity,
      );
      return this.generateMessage('product successfully added');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put(':productId')
  public async updateQuantityPerProduct(
    @Body() body: ProductUpdaterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
  ) {
    try {
      if (body.quantity === 0) {
        await this.shoppingCartUpdater.deleteProduct(
          productId,
          String(req.user),
        );
      } else {
        await this.shoppingCartUpdater.updateQuantityPerProduct(
          productId,
          String(req.user),
          body.quantity,
        );
      }
      return this.generateMessage('shopping cart successfully updated');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  public async deleteProduct(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
  ) {
    try {
      await this.shoppingCartUpdater.deleteProduct(productId, String(req.user));
      return this.generateMessage('product successfully removed');
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  private generateResponseForBadRequest(res: Response, error: HttpException) {
    res.status(400);
    return {
      error,
    };
  }

  private generateMessage(message: string) {
    return {
      message,
    };
  }
}
