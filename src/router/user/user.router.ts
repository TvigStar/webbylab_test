import { Router } from 'express';

import { userController } from '../../controller';
import { checkIsEmailExistMiddleware, checkIsUserValidMiddleware } from '../../middlewares';

const router = Router();

router.post('/',
  checkIsEmailExistMiddleware,
  checkIsUserValidMiddleware,
  userController.createUser);

export const userRouter = router;

