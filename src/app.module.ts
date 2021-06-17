import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './ecommerce/authentication/authentication.module';
import { UserModule } from './ecommerce/user/user.module';
import { ProductModule } from './ecommerce/product/product.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthenticationModule, UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
