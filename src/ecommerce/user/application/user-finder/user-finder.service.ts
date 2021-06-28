import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user-repository';
import { LoginUserDto } from '../../dto/login-user.dto';

@Injectable()
export class UserFinderService {
  public constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async get(loginUserDto: LoginUserDto, role: string) {
    return await this.userRepository.get(loginUserDto, role);
  }

  public async getById(userId: string) {
    return await this.userRepository.getById(userId);
  }

  public async getAll() {
    return await this.userRepository.getAll();
  }
}
