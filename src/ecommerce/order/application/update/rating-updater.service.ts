import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/order-repository';

@Injectable()
export class RatingUpdaterService {
  public constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  public async updateRating(productId: string, orderId: string) {
    return await this.orderRepository.updateRating(productId, orderId);
  }
}
