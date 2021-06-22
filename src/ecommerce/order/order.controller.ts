import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { OrderCreatorService } from './application/create/order-creator.service';

interface OrderCreatorDto {
  userId: string;
  productsId: string[];
}

@Controller('order')
export class OrderController {
  public constructor(private readonly orderCreator: OrderCreatorService) {}

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
}
