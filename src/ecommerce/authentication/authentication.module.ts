import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-payload-constants';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocationRateLimitInterceptor } from './interceptors/location-rate-limit.interceptor';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.token,
      signOptions: {
        expiresIn: jwtConstants.expireIn,
      },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy, LocationRateLimitInterceptor],
  exports: [AuthenticationService, LocationRateLimitInterceptor],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
