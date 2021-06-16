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
      };
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
