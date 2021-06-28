import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductRepository } from '../domain/product-repository';

@Injectable()
export class ProductPostgresqlRepository implements ProductRepository {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async getProductByFilter(filter: string) {
    const filterToUppsercase = filter.toUpperCase();
    const replacedFilter = `%${filterToUppsercase.split('-').join('%')}%`;
    const query = `SELECT product_id, category_id, brand_id, title, price, stock, description, url_image, average_score FROM products WHERE title like $1`;
    const products = await this.databaseService.executeQuery(query, [
      replacedFilter,
    ]);
    return products;
  }

  public async get(criteriaId: string, criteriaType: string) {
    const query = `SELECT product_id, category_id, brand_id, title, price, stock, description, url_image, average_score FROM products WHERE ${criteriaType} = $1`;
    const products = await this.databaseService.executeQuery(query, [
      criteriaId,
    ]);
    if (products.length < 1) {
      throw new HttpException(
        `${criteriaType} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return products;
  }

  public async getProductById(productId: string) {
    const productDb = await this.databaseService.executeQuery(
      'SELECT * from products WHERE product_id=$1',
      [productId],
    );

    const ratingsQuery =
      'SELECT U.firstname, U.lastname, R.score, R.comment FROM users U JOIN ratings R ON U.user_id=R.user_id WHERE R.product_id=$1';

    const ratings = await this.databaseService.executeQuery(ratingsQuery, [
      productId,
    ]);

    const convertedAverageScore = Number(productDb[0]['average_score']);
    productDb[0]['average_score'] = convertedAverageScore;

    return { product: productDb[0], ratings };
  }
}
