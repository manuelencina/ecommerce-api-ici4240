export interface OrderRepository {
  create(userId: string): Promise<any>;
}
