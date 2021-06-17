import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  idcard: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  residence_address: string;

  @IsNotEmpty()
  region: string;

  @IsNotEmpty()
  commune: string;
}
