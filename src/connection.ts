import { Sequelize } from 'sequelize-typescript';
import {MovieModel, TokenModel, UserModel} from './database';

const connection = new Sequelize({
  dialect: 'sqlite',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'testSQL.sqlite',
  logging: false,
  models: [MovieModel, TokenModel, UserModel]
});

export default connection;
