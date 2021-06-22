import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderController } from './order.controller';
import { OrderCreatorService } from './application/create/order-creator.service';
import { OrderPostgreSQL } from './infrastructure/order-postgresql.repository';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [OrderController],
  providers: [
    OrderCreatorService,
    OrderPostgreSQL,
    {
      provide: 'OrderRepository',
      useClass: OrderPostgreSQL,
    },
  ],
  exports: [OrderCreatorService, OrderPostgreSQL],
})
export class OrderModule {}
