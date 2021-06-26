import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/order-repository';
import { RatingCreatorDto } from '../../dto/rating-creator.dto';

@Injectable()
export class RatingUpdaterService {
  public constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  public async updateRating(
    productId: string,
    orderId: string,
    rating: RatingCreatorDto,
  ) {
    return await this.orderRepository.updateRating(productId, orderId, rating);
  }
}
