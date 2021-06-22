import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ShoppingCartRepository } from '../domain/shopping-cart.repository';

@Injectable()
export class ShoppingCartPostgreSQL implements ShoppingCartRepository {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async addProduct(productId: string, userId: string, quantity: number) {
    try {
      const cart = await this.databaseService.executeQuery('SELECT cart_id FROM shopping_carts WHERE user_id=$1', [userId]);
      const cartId = cart[0]['cart_id'];

      await this.databaseService.executeQuery(
        'INSERT INTO products_shopping_carts(product_id, cart_id, quantity) VALUES($1, $2, $3) RETURNING *',
        [productId, cartId, quantity],
      );

      const price = await this.databaseService.executeQuery(
        'SELECT price FROM products WHERE product_id=$1',
        [productId],
      );

      const totalPriceDB = await this.databaseService.executeQuery(
        'SELECT total_price FROM shopping_carts WHERE cart_id=$1',
        [cartId],
      );

      const updatedTotalPrice =
        totalPriceDB[0]['total_price'] + price[0]['price'] * quantity;

      const updatedCart = await this.databaseService.executeQuery(
        'UPDATE shopping_carts SET total_price=$1 WHERE cart_id=$2 RETURNING *',
        [updatedTotalPrice, cartId],
      );
    } catch (error) {
      throw new HttpException(`invalid id`, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateQuantityPerProduct(
    productId: string,
    userId: string,
    quantity: number,
  ) {
    const cart = await this.databaseService.executeQuery('SELECT cart_id FROM shopping_carts WHERE user_id=$1', [userId]);
    const cartId = cart[0]['cart_id'];
    const cartIdDb = await this.databaseService.executeQuery(
      'SELECT cart_id FROM shopping_carts WHERE cart_id = $1',
      [cartId],
    );

    if (cartIdDb.length < 1) {
      throw new HttpException(
        `cart with id ${cartId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const productsShoppingCarts = await this.databaseService.executeQuery(
      'SELECT * FROM products_shopping_carts WHERE cart_id=$1 AND product_id=$2',
      [cartId, productId],
    );

    const productPrice = await this.databaseService.executeQuery(
      'SELECT price FROM products WHERE product_id=$1',
      [productsShoppingCarts[0]['product_id']],
    );

    const totalPriceDB = await this.databaseService.executeQuery(
      'SELECT total_price FROM shopping_carts WHERE cart_id=$1',
      [cartId],
    );

    const updatedTotalPrice =
      totalPriceDB[0]['total_price'] -
      productsShoppingCarts[0]['quantity'] * productPrice[0]['price'];

    const newTotalPrice =
      updatedTotalPrice + productPrice[0]['price'] * quantity;

    const productsShoppingCartsUpdated =
      await this.databaseService.executeQuery(
        'UPDATE products_shopping_carts SET quantity=$1 WHERE cart_id=$2 AND product_id=$3 RETURNING *',
        [quantity, cartId, productId],
      );

    const updatedShoppingCart = await this.databaseService.executeQuery(
      'UPDATE shopping_carts SET total_price=$1 WHERE cart_id=$2 RETURNING *',
      [newTotalPrice, cartId],
    );
  }

  public async deleteProduct(productId: string, userId: string) {
    const cart = await this.databaseService.executeQuery('SELECT cart_id FROM shopping_carts WHERE user_id=$1', [userId]);
      const cartId = cart[0]['cart_id'];
    const productsShoppingCarts = await this.databaseService.executeQuery(
      'SELECT * FROM products_shopping_carts WHERE cart_id=$1 AND product_id=$2',
      [cartId, productId],
    );

    if (productsShoppingCarts.length < 1) {
      throw new HttpException(
        `there is no product with id ${cartId} in cart with id ${productId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const productPrice = await this.databaseService.executeQuery(
      'SELECT price FROM products WHERE product_id=$1',
      [productsShoppingCarts[0]['product_id']],
    );

    const totalPriceDB = await this.databaseService.executeQuery(
      'SELECT total_price FROM shopping_carts WHERE cart_id=$1',
      [cartId],
    );

    const updatedTotalPrice =
      totalPriceDB[0]['total_price'] -
      productsShoppingCarts[0]['quantity'] * productPrice[0]['price'];

    await this.databaseService.executeQuery(
      'DELETE FROM products_shopping_carts WHERE cart_id=$1 AND product_id=$2',
      [cartId, productId],
    );

    const updatedShoppingCart = await this.databaseService.executeQuery(
      'UPDATE shopping_carts SET total_price=$1 WHERE cart_id=$2 RETURNING *',
      [updatedTotalPrice, cartId],
    );
  }

  public async get(userId: string) {
    const userIdDB = await this.databaseService.executeQuery(
      'SELECT user_id from users WHERE user_id = $1',
      [userId],
    );

    if (userIdDB.length < 1) {
      throw new HttpException(`user does not exist`, HttpStatus.BAD_REQUEST);
    }

    const cartId = await this.databaseService.executeQuery(
      'SELECT cart_id FROM shopping_carts WHERE user_id = $1',
      [userIdDB[0]['user_id']],
    );

    const cartIdDB = cartId[0]['cart_id'];

    const cartDB = await this.databaseService.executeQuery(
      'SELECT P.product_id, P.title, PC.quantity, P.price, P.url_image FROM products P JOIN products_shopping_carts PC ON P.product_id = PC.product_id WHERE PC.cart_id = $1',
      [cartIdDB],
    );

    return cartDB;
  }
}
