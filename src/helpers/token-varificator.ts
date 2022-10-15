import { verify, VerifyErrors } from 'jsonwebtoken';

import { customErrors, ErrorHandler } from '../errors';
import { config } from '../config';
import { ResponseStatusCodesEnum } from '../constants';

export const tokenVerification = async (token: string): Promise<VerifyErrors | null> => {
  try {
    const isValid = await verify(token, config.JWT_SECRET) as Promise<VerifyErrors | null>;

    return isValid;
  } catch (e) {
    throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message);
  }
};
