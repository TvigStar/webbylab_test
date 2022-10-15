import { Router } from 'express';
import { authController } from '../../controller';
import {
  checkIsUserExistByEmailMiddleware,
  emailPasswordValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post('/',
  emailPasswordValidatorMiddleware,
  checkIsUserExistByEmailMiddleware,
  authController.authUser);

export const authRouter = router;
