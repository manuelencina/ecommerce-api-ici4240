export interface ShoppingCartRepository {
  addProduct(productId: string, cartId: string, quantity: number): Promise<any>;
  updateQuantityPerProduct(cartId: string, quantity: number): Promise<any>;
  deleteProduct(productId: string, cartId: string): Promise<any>;
}
