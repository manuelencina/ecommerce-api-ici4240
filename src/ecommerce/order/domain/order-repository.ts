import { RatingCreatorDto } from '../dto/rating-creator.dto';

export interface OrderRepository {
  create(userId: string): Promise<any>;
  get(userId: string): Promise<any>;
  getAll(): Promise<any>;
  updateRating(
    productId: string,
    orderId: string,
    rating: RatingCreatorDto,
  ): Promise<any>;
}
