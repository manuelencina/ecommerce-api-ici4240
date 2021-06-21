export interface ShoppingCartRepository {
  addProduct(productId: string, cartId: string, quantity: number): Promise<any>;
  updateQuantityPerProduct(
    productId: string,
    cartId: string,
    quantity: number,
  ): Promise<any>;
  deleteProduct(productId: string, cartId: string): Promise<any>;
  get(userId: string): Promise<any>;
}
