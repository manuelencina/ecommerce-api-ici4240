import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  HttpException,
  HttpCode,
  Req,
  Get,
  UseGuards,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { LoginUserDto } from '../user/dto/login-user.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocationRateLimitInterceptor } from './interceptors/location-rate-limit.interceptor';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @ApiCreatedResponse({
    description: 'obtain authentication token',
    type: 'string',
  })
  @ApiBadRequestResponse({
    description: 'invalid registration data',
  })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(new LocationRateLimitInterceptor())
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const accessToken = await this.authenticationService.registerUser(
        registerUserDto,
      );
      return {
        ...accessToken,
      };
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(new LocationRateLimitInterceptor())
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const accessToken = await this.authenticationService.login(loginUserDto);
      res.status(HttpStatus.OK);
      return {
        ...accessToken,
      };
    } catch (error) {
      return this.generateResponseForBadRequest(res, error);
    }
  }

  private generateResponseForBadRequest(res: Response, error: HttpException) {
    res.status(400);
    return {
      error,
    };
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  public async getProfile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authenticationService.getUser(String(req.user));
    return {
      user,
    };
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  public async putProfile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.authenticationService.updateUser(
      updateUserDto,
      String(req.user),
    );
    return {
      message: 'updated profile',
    };
  }
}
