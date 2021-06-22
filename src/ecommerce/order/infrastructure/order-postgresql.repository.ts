import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderRepository } from '../domain/order-repository';

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

  private async validateStocks(productsShoppingCarts: any[]) {
    productsShoppingCarts.forEach(async (product) => {
      const productStock = await this.databaseService.executeQuery(
        'SELECT stock FROM products WHERE product_id=$1',
        [product['product_id']],
      );
      console.log(productStock[0]['stock']);
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
