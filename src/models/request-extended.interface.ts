import { Request } from 'express';
import { MovieModel, UserModel } from '../database';

export interface IRequestExtended extends Request{
  user?: UserModel
  movie?: MovieModel
  file?: any
}
