import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user-repository';
import { RegisterUserDto } from '../../dto/register-user.dto';

@Injectable()
export class UserCreatorService {
  public constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async save(userDto: RegisterUserDto) {
    return await this.userRepository.save(userDto);
  }
}
