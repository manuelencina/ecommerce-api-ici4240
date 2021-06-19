import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    const accessToken = await this.authenticationService.registerUser(
      registerUserDto,
    );
    return {
      ...accessToken,
    };
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const accessToken = await this.authenticationService.login(loginUserDto);
    return {
      ...accessToken,
    };
  }
}
