import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { OrderFinderService } from '../order/application/find/order-finder.service';
import { UserFinderService } from '../user/application/user-finder/user-finder.service';

@ApiTags('admin-panel')
@Controller('admin-panel')
export class AdminPanelController {
  public constructor(
    private readonly userFinder: UserFinderService,
    private readonly orderFinder: OrderFinderService,
  ) {}

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get('users')
  public async getusers() {
    const users = await this.userFinder.getAll();
    return {
      users,
    };
  }

  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  public async getOrders() {
    const orders = await this.orderFinder.getAll();
    return {
      orders,
    };
  }
}
