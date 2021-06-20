import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ShoppingCartPostgreSQL } from './infrastructure/shopping-cart-postgresql.repository';
import { ShoppingCartUpdaterService } from './application/update/shopping-cart-updater.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ShoppingCartFinderService } from './application/find/shopping-cart-finder.service';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  providers: [
    ShoppingCartPostgreSQL,
    {
      provide: 'ShoppingCartRepository',
      useClass: ShoppingCartPostgreSQL,
    },
    ShoppingCartUpdaterService,
    ShoppingCartFinderService,
  ],
  exports: [
    ShoppingCartPostgreSQL,
    ShoppingCartUpdaterService,
    ShoppingCartFinderService,
  ],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
