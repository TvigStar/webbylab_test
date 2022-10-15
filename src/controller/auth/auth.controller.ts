import { UserModel } from '../../database';
import { IRequestExtended,  } from '../../models';
import { NextFunction, Response } from 'express';
import { comparePassword, tokenizer } from '../../helpers';
import { ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';

class AuthController {
  async authUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {id, password} = req.user as UserModel;
      const authInfo = req.body;

      const isPasswordEquals = await comparePassword(authInfo.password, password);

      if (!isPasswordEquals) {
        return next (new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND,
          customErrors.NOT_FOUND.message
        ));
      }

      const token = tokenizer(id);

      res.status(200).json({token});
    } catch (err) {
      return next(err);
    }
  }
}

export const authController = new AuthController();
