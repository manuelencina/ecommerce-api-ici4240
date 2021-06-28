export interface ProductRepository {
  get(criteriaId: string, criteriaType: string): Promise<any>;
  getProductById(productId: string): Promise<any>;
  getProductByFilter(filter: string): Promise<any>;
}
