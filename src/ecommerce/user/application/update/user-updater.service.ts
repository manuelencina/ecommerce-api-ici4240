import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user-repository';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserUpdaterService {
  public constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  public async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    return await this.userRepository.update(updateUserDto, userId);
  }
}
