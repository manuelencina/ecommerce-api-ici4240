export interface ShoppingCartRepository {
  addProduct(productId: string, userId: string, quantity: number): Promise<any>;
  updateQuantityPerProduct(
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<any>;
  deleteProduct(productId: string, userId: string): Promise<any>;
  get(userId: string): Promise<any>;
}
