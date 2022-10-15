import * as Joi from 'joi';
import { RegExpEnum } from '../../constants';

export const newUserValidator = Joi.object({
  name:Joi.string().trim().max(25).min(2).required(),
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  confirmPassword: Joi.string().trim().regex(RegExpEnum.password).required()
});
