export interface OrderRepository {
  create(userId: string): Promise<any>;
  get(userId: string): Promise<any>;
  updateRating(productId: string, orderId: string): Promise<any>;
}
