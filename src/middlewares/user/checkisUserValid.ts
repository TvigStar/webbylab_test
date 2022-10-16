import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../models';

import { newUserValidator } from '../../validators';

export const checkIsUserValidMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {error} = newUserValidator.validate(req.body);

    if (error) {
      return next(new Error(error.details[0].message));
    }
    next();
  } catch (err){
    next(err);
  }
};
