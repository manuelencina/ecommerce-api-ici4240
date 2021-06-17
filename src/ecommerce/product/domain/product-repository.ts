import { ProductDto } from '../dto/product.dto';

export interface ProductRepository {
  get(categoryId: string): Promise<any>;
}
