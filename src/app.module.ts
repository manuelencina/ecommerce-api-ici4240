import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './ecommerce/authentication/authentication.module';
import { UserModule } from './ecommerce/user/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthenticationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
