import {
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
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { OrderCreatorService } from './application/create/order-creator.service';
import { OrderFinderService } from './application/find/order-finder.service';
import { RatingUpdaterService } from './application/update/rating-updater.service';
import { RatingCreatorDto } from './dto/rating-creator.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  public constructor(
    private readonly orderCreator: OrderCreatorService,
    private readonly orderFinder: OrderFinderService,
    private readonly ratingUpdater: RatingUpdaterService,
  ) {}

  @ApiBearerAuth('JWT')
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

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@Req() req: Request) {
    const orders = await this.orderFinder.get(String(req.user));
    return {
      orders,
    };
  }

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put(':productId/:orderId')
  public async getProductsByBrandId(
    @Param('productId', new ParseUUIDPipe({ version: '4' }))
    productId: string,
    @Param('orderId', new ParseUUIDPipe({ version: '4' }))
    orderId: string,
    @Body() rating: RatingCreatorDto,
  ) {
    await this.ratingUpdater.updateRating(productId, orderId, rating);
    return {
      message: 'rating successfully updated',
    };
  }
}
