import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductRepository } from '../domain/product-repository';

@Injectable()
export class ProductPostgresqlRepository implements ProductRepository {
  public constructor(private readonly databaseService: DatabaseService) {}
  public async get(categoryId: string) {
    const products = await this.databaseService.executeQuery(
      'SELECT product_id, category_id, brand_id, title, price, stock, description, url_image FROM products WHERE category_id = $1',
      [categoryId],
    );
    if (products.length < 1) {
      throw new HttpException(
        'category does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return products;
  }
}
