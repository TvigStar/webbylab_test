import { Router } from 'express';
import { movieController } from '../../controller';
import {
  checkTokenMiddleware,
  isMovieExistsMiddleware
} from '../../middlewares';
import { newMovieValidatorMiddleware } from '../../middlewares';

const router = Router();

router.post('/',
  checkTokenMiddleware,
  newMovieValidatorMiddleware,
  movieController.createMovie);

router.delete('/:id',
  checkTokenMiddleware,
  isMovieExistsMiddleware,
  movieController.deleteMovie
);

router.patch('/:id',
  checkTokenMiddleware,
  isMovieExistsMiddleware,
  movieController.updateMovie
);

router.get('/:id',
  checkTokenMiddleware,
  isMovieExistsMiddleware,
  movieController.getMovieById
);

router.get('/',
  checkTokenMiddleware,
  movieController.getMoviesByParams
);

router.post('/import',
  checkTokenMiddleware,
  movieController.importFromFIle
);

export const moviesRouter = router;
