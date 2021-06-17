import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user-repository';
import { LoginUserDto } from '../../dto/login-user.dto';

@Injectable()
export class UserFinderService {
  public constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async get(loginUserDto: LoginUserDto) {
    return await this.userRepository.get(loginUserDto);
  }

  public async getById(userId: string) {
    return await this.userRepository.getById(userId);
  }
}
