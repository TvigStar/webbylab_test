import { Sequelize } from 'sequelize-typescript';
import {MovieModel, TokenModel, UserModel} from './database';

const connection = new Sequelize({
  storage: ':memory:',
  dialect: 'sqlite',
  models: [MovieModel, TokenModel, UserModel]
});

export default connection;
