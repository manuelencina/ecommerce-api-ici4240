import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  token: String(process.env.TOKEN_SECRET),
  expireIn: String(process.env.EXPIRES_IN),
};
