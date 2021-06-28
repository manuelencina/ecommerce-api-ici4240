import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';
import { join } from 'path';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    this.envConfig = this.setEnvironmentVariables();
  }

  private setEnvironmentVariables() {
    const isDevelopmentEnv: boolean = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = join(__dirname, '/../../.env');
      const exixstsPath = fs.existsSync(envFilePath);
      if (!exixstsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      return parse(fs.readFileSync(envFilePath));
    } else {
      return {
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        TOKEN_SECRET: process.env.TOKEN_SECRET,
        EXPIRES_IN: process.env.EXPIRES_IN,
        RECAPTCHA_TOKEN_SECRET: process.env.RECAPTCHA_TOKEN_SECRET,
      };
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
