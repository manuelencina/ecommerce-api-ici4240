import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderRepository } from '../domain/order-repository';
import { RatingCreatorDto } from '../dto/rating-creator.dto';

@Injectable()
export class OrderPostgreSQL implements OrderRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async create(userId: string) {
    const userIdDB = await this.databaseService.executeQuery(
      'SELECT user_id from users WHERE user_id = $1',
      [userId],
    );

    if (userIdDB.length < 1) {
      throw new HttpException(`user does not exist`, HttpStatus.BAD_REQUEST);
    }

    const cart = await this.databaseService.executeQuery(
      'SELECT cart_id, total_price FROM shopping_carts WHERE user_id = $1',
      [userIdDB[0]['user_id']],
    );

    const cartIdDB = cart[0]['cart_id'];
    const totalPrice = cart[0]['total_price'];

    const productsShoppingCarts = await this.databaseService.executeQuery(
      'SELECT * FROM products_shopping_carts sh  WHERE cart_id=$1',
      [cartIdDB],
    );

    this.validateStocks(productsShoppingCarts);

    this.updateStocks(productsShoppingCarts);

    this.createOrder(productsShoppingCarts, userId, totalPrice);

    this.removeProductsFromShoppingCart(cartIdDB);

    this.updateShoppingCartTotalPrice(userId);
  }

  public async get(userId: string) {
    const query =
      'SELECT P.product_id,O.order_id,P.title,P.price,P.url_image,PO.quantity,O.total_price AS orders_total_price,PO.rated, O.create_at FROM orders O  INNER JOIN products_orders PO ON (O.order_id=PO.order_id) JOIN products P ON (P.product_id = PO.product_id) WHERE O.user_id=$1';
    const orders = await this.databaseService.executeQuery(query, [userId]);
    return orders;
  }

  public async updateRating(
    productId: string,
    orderId: string,
    rating: RatingCreatorDto,
  ) {
    const { comment, score } = rating;

    const updatedRating = await this.databaseService.executeQuery(
      'UPDATE products_orders SET rated=true WHERE product_id=$1 AND order_id=$2',
      [productId, orderId],
    );
    const userId = await this.databaseService.executeQuery(
      'SELECT user_id FROM orders WHERE order_id=$1',
      [orderId],
    );

    await this.databaseService.executeQuery(
      'INSERT INTO ratings(score,comment,product_id,user_id) VALUES($1,$2,$3,$4)',
      [score, comment, productId, userId[0]['user_id']],
    );

    const averageScore = await this.databaseService.executeQuery(
      'SELECT AVG(score) FROM ratings WHERE product_id=$1',
      [productId],
    );

    const fixedAverageScore = Number(averageScore[0]['avg']).toFixed(2);
    await this.databaseService.executeQuery(
      'UPDATE products SET average_score=$1 WHERE product_id=$2',
      [fixedAverageScore, productId],
    );
  }

  private async validateStocks(productsShoppingCarts: any[]) {
    productsShoppingCarts.forEach(async (product) => {
      const productStock = await this.databaseService.executeQuery(
        'SELECT stock FROM products WHERE product_id=$1',
        [product['product_id']],
      );
      if (productStock[0]['stock'] < product['quantity']) {
        throw new HttpException(
          `Unsuccessful purchase`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  private async updateStocks(productsShoppingCarts: any[]) {
    productsShoppingCarts.forEach(async (product) => {
      try {
        const productStock = await this.databaseService.executeQuery(
          'SELECT stock FROM products WHERE product_id=$1',
          [product['product_id']],
        );
        const updatedStock = productStock[0]['stock'] - product['quantity'];
        await this.databaseService.executeQuery(
          'UPDATE products SET stock=$1 WHERE product_id=$2 ',
          [updatedStock, product['product_id']],
        );
      } catch (error) {
        throw new HttpException(
          `Unsuccessful purchase`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  private async createOrder(
    productsShoppingCarts: any[],
    userId: string,
    totalPrice: number,
  ) {
    const createdOrder = await this.databaseService.executeQuery(
      'INSERT INTO orders(user_id,total_price) VALUES($1,$2) RETURNING *',
      [userId, totalPrice],
    );

    productsShoppingCarts.forEach(async (product) => {
      await this.databaseService.executeQuery(
        'INSERT INTO products_orders(order_id,product_id,quantity) VALUES($1,$2,$3)',
        [
          createdOrder[0]['order_id'],
          product['product_id'],
          product['quantity'],
        ],
      );
    });
  }

  private async removeProductsFromShoppingCart(cartIdDB: string) {
    await this.databaseService.executeQuery(
      'DELETE FROM products_shopping_carts WHERE cart_id=$1',
      [cartIdDB],
    );
  }

  private async updateShoppingCartTotalPrice(userId: string) {
    await this.databaseService.executeQuery(
      'UPDATE shopping_carts SET total_price=$1 WHERE user_id=$2',
      [0, userId],
    );
  }
}
