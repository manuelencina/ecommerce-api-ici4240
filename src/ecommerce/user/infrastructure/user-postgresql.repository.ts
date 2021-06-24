import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserRepository } from '../domain/user-repository';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserRepositoryPostgresql implements UserRepository {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async save(userDto: RegisterUserDto) {
    let {
      firstname,
      lastname,
      email,
      password,
      commune,
      idcard,
      region,
      residence_address,
    } = userDto;

    let [name, domain] = email.split('@');

    const modifiedEmail = `${name}@${domain.toLowerCase()}`;

    const userDB = await this.databaseService.executeQuery(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (userDB.length > 0) {
      throw new HttpException(
        `User already exists with the email ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      password = encryptedPassword;

      const userRegistered = await this.databaseService.executeQuery(
        'INSERT INTO users(firstname, lastname, email, password, idcard, region, commune, residence_address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [
          firstname,
          lastname,
          modifiedEmail,
          password,
          idcard,
          region,
          commune,
          residence_address,
        ],
      );
      await this.databaseService.executeQuery(
        'INSERT INTO shopping_carts(user_id) VALUES($1) RETURNING *',
        [userRegistered[0]['user_id']],
      );

      return userRegistered[0]['user_id'];
    } catch (error) {
      throw new HttpException(
        `User already exists with the email ${modifiedEmail}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async get(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const userDB = await this.databaseService.executeQuery(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (userDB.length < 1) {
      throw new HttpException(`Invalid credentials`, HttpStatus.BAD_REQUEST);
    }
    const isValidPassword = await bcrypt.compare(
      password,
      userDB[0]['password'],
    );
    if (!isValidPassword) {
      throw new HttpException(`Invalid credentials`, HttpStatus.BAD_REQUEST);
    }
    return userDB[0];
  }

  public async getById(userId: string) {
    const userDB = await this.databaseService.executeQuery(
      'SELECT firstname,lastname,email,idcard,residence_address,region,commune FROM users WHERE user_id = $1',
      [userId],
    );
    if (userDB.length < 1) {
      throw new HttpException(`Invalid credentials`, HttpStatus.BAD_REQUEST);
    }
    return userDB[0];
  }
}
