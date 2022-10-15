import { NextFunction, Request, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants';
import {UserModel} from '../../database';
import { customErrors, ErrorHandler } from '../../errors';
import { userService } from '../../services';
import { hashPassword, tokenizer } from '../../helpers';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_PASSWORDS_NO_EQUAL.message));
      }

      const user = req.body as UserModel;

      user.password = await hashPassword(user.password);

      const createdUser = await userService.createUser(user);
      const token = tokenizer(createdUser.id);

      res.status(201).json({...createdUser, token});
    } catch (error) {
      console.log(error);
    }
  }
}

export const userController = new UserController();
