import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { UserCreatorService } from '../user/application/user-creator/user-creator.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserFinderService } from '../user/application/user-finder/user-finder.service';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userCreatorService: UserCreatorService,
    private readonly userFinderService: UserFinderService,
  ) {}

  public async validateUser(payload: JwtPayload) {
    try {
      const userId = payload.sub;
      const user = await this.userFinderService.getById(userId);
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  public async registerUser(userDto: RegisterUserDto) {
    const userId = await this.userCreatorService.save(userDto);
    const accessToken = this.createToken(userId);
    return accessToken;
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.userFinderService.get(loginUserDto);
    const accessToken = this.createToken(user['user_id']);
    return accessToken;
  }

  private createToken(userId: string) {
    const accessToken = this.jwtService.sign({
      iss: 'ecommerce-api-ici4240',
      sub: userId,
    });
    return {
      'access-token': `Bearer ${accessToken}`,
    };
  }
}
