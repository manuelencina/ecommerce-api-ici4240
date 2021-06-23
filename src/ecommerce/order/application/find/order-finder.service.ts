import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/order-repository';

@Injectable()
export class OrderFinderService {
  public constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  public async get(userId: string) {
    return await this.orderRepository.get(userId);
  }
}
