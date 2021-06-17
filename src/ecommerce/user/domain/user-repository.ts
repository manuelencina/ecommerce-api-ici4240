import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

export interface UserRepository {
  save(userDto: RegisterUserDto): Promise<any>;
  get(loginUserDto: LoginUserDto): Promise<any>;
  getById(userId: string): Promise<any>;
}
