import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UpdateUserDto {
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
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ0-9]*$/, { message: 'invalid address' })
  residence_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ0-9]*$/, { message: 'invalid region' })
  region: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÑñ áéíóúÁÉÍÓÚ]*$/, { message: 'invalid commune' })
  commune: string;
}
