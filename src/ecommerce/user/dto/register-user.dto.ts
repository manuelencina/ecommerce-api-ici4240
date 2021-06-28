import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid firstname' })
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid lastname' })
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 -]+)$/, {
    message: 'invalid idcard',
  })
  idcard: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  residence_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recaptcha: string;
}
