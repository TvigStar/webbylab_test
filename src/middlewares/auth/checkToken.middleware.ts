import { NextFunction, Response } from 'express';
import { RequestHeadersEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';
import { tokenVerification } from '../../helpers';

export const checkTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
      return next (new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokenVerification(token);
    next();
  } catch (err) {
    next(err);
  }
};
