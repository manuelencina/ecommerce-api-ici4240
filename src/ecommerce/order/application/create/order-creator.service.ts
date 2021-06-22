import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/order-repository';

@Injectable()
export class OrderCreatorService {
  public constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  public async create(userId: string) {
    return await this.orderRepository.create(userId);
  }
}
