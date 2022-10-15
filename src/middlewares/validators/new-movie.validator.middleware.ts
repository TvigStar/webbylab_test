import { NextFunction, Request, Response } from 'express';
import { newMovieValidator } from '../../validators';
import { ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

export const newMovieValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = newMovieValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
