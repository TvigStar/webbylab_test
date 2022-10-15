import { Router } from 'express';
import { userController } from '../../controller';
import {
  checkIsEmailExistMiddleware,
  checkIsUserValidMiddleware
} from '../../middlewares';

const router = Router();

router.post('/', checkIsUserValidMiddleware, checkIsEmailExistMiddleware, userController.createUser);

export const userRouter = router;

