import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './ecommerce/authentication/authentication.module';
import { UserModule } from './ecommerce/user/user.module';
import { ProductModule } from './ecommerce/product/product.module';
import { ShoppingCartModule } from './ecommerce/shopping-cart/shopping-cart.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { CategoryModule } from './ecommerce/category/category.module';
import { OrderModule } from './ecommerce/order/order.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthenticationModule,
    UserModule,
    ProductModule,
    ShoppingCartModule,
    CategoryModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  public constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Configuration.PORT);
  }
}
