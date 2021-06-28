import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { AdminPanelController } from './admin-panel.controller';

@Module({
  imports: [AuthenticationModule, UserModule, OrderModule],
  controllers: [AdminPanelController],
})
export class AdminPanelModule {}
