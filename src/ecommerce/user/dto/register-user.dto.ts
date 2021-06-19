import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid firstname' })
  firstname: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid lastname' })
  lastname: string;

  @IsNotEmpty()
  @Matches(/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 -]+)$/, {
    message: 'invalid idcard',
  })
  idcard: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ0-9]*$/, { message: 'invalid address' })
  residence_address: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ0-9]*$/, { message: 'invalid region' })
  region: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid commune' })
  commune: string;
}
