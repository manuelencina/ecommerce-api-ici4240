import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { OrderCreatorService } from './application/create/order-creator.service';
import { OrderFinderService } from './application/find/order-finder.service';
import { RatingUpdaterService } from './application/update/rating-updater.service';

interface OrderCreatorDto {
  userId: string;
  productsId: string[];
}

@Controller('order')
export class OrderController {
  public constructor(
    private readonly orderCreator: OrderCreatorService,
    private readonly orderFinder: OrderFinderService,
    private readonly ratingUpdater: RatingUpdaterService,
  ) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Req() req: Request) {
    try {
      await this.orderCreator.create(String(req.user));
      return {
        message: 'order created successfully',
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@Req() req: Request) {
    const orders = await this.orderFinder.get(String(req.user));
    return {
      orders,
    };
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put(':productId/:createAt')
  public async getProductsByBrandId(
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
    @Param('createAt', new ParseUUIDPipe({ version: '4' }))
    orderId: string,
    @Req() req: Request,
  ) {
    await this.ratingUpdater.updateRating(productId, orderId);
    return {
      message: 'rating successfully updated',
    };
  }
}
