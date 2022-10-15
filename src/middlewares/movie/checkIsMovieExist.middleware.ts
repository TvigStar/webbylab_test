import { IRequestExtended } from '../../models';
import { NextFunction, Response } from 'express';
import { movieService } from '../../services';
import { customErrors, ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

export const isMovieExistsMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const {id} = req.params;

  const movie = await movieService.findMovieByParam({id});
  if (!movie) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
  }

  req.movie = movie;
  next();
};
