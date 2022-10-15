import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import * as cors from 'cors';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import fileUpload = require('express-fileupload');
import * as path from 'path';
import { config } from './config';
import connection from './connection';
import { authRouter, moviesRouter, userRouter } from './router';
import { ResponseStatusCodesEnum } from './constants';
dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');

    this.app.use(morgan('dev'));
    this.app.use(helmet.default());
    this.app.use(serverRequestLimit);
    this.app.use(cors({
      origin: this.configureCors
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(fileUpload({
      limits: { fileSize: 5 * 1024 * 1024 }
    }));

    this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));
    this.startDB();
    this.mountRoutes();

    this.app.use(this.customErrorHandler);
  }

  private async startDB(){
    try {
      await connection.sync();
    } catch (err) {
      console.log(err);
    }
  }

  private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    res
      .status(err.status || ResponseStatusCodesEnum.SERVER)
      .json({
        message: err.message || 'Unknown Error',
        code: err.code
      });
  }

  private configureCors = (origin: any, callback: any) => {
    const whiteList = config.ALLOWED_ORIGIN.split(',');

    if (!origin) {
      return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
      return callback(new Error('Cors not allowed'));
    }

    return callback(null, true);
  };

  private mountRoutes(): void {
    this.app.use('/sessions', authRouter);
    this.app.use('/movies', moviesRouter);
    this.app.use('/users', userRouter);
  }
}

export const app = new App().app;

