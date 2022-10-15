import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const tokenizer = (id: number): any => {
  return jwt.sign({id}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
};

