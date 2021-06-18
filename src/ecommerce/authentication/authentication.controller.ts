import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const accessToken = await this.authenticationService.registerUser(
      registerUserDto,
    );
    return {
      ...accessToken,
    };
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const accessToken = await this.authenticationService.login(loginUserDto);
    return {
      ...accessToken,
    };
  }
}
