import { ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';
import {NextFunction, Request, Response} from 'express';
import { movieService } from '../../services';

class MoviesController {
  async createMovie(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const movie = req.body;
      movie.actors = req.body.actors.join(',');

      const isPresent = await movieService.findMovieByParam({title: movie.title});
      if (isPresent){
        return next( new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_MOVIE_REGISTERED.message));
      }

      const newMovie = await movieService.createMovie(movie);
      newMovie.actors = newMovie.actors.split(',') as any;

      res.status(201).json(newMovie);
    } catch (err) {
      next(err);
    }
  }

  async deleteMovie(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      await movieService.delete(req.movie.id);

      res.end();
    } catch (err) {
      next(err);
    }
  }

  async updateMovie(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const movie = req.movie;
      const movieToUpdate = req.body;
      movieToUpdate.actors = movieToUpdate.actors.join(',');

      await movieService.updateById(movie.id, movieToUpdate);
      const updatedMovie = await movieService.findMovieByParam({id:movie.id});

      updatedMovie.actors = updatedMovie.actors.split(',') as any;
      res.status(200).json(updatedMovie);
    } catch (err){
      next(err);
    }
  }

  async getMovieById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const movie = await movieService.findMovieByParam({id:req.movie.id});
      movie.actors = movie.actors.split(',') as any;
      res.status(200).json(movie);
    } catch (err){
      next(err);
    }
  }

  async getMoviesByParams(req: Request, res: Response, next: NextFunction){
    try {
      const { limit = 20, offset = 0, sortBy = 'id', order = 'DESC', actors = '', title = '' } = req.query;
      const search = req.query.search as string;
      const movies = await movieService.getByPrams({
        limit,
        offset,
        order,
        sortBy,
        search: search ? search.split(',') : [], actors, title
      });

      res.json(movies);
    } catch (err){
      next(err);
    }
  }

  async importFromFIle(req: Request, res: Response, next: NextFunction){

    try {
      // @ts-ignore
      const data = req.files.movies.data;
      // @ts-ignore
      const dataArray = data.toString('utf8').split('\n');
      const movies = [];
      const arrayOfRows = dataArray.filter((data: any) => !!data);
      while (arrayOfRows.length) {
        const [title, year, format, actors] = arrayOfRows.splice(0, 4);
        movies.push({
          title: title.split(':')[1].trim(),
          year: year.split(':')[1].trim(),
          format: format.split(':')[1].trim(),
          actors: actors.split(':')[1].split(',').map((el: string) => el.trim()).join(',')
        });
      }

      const createdMovies = await movieService.createMany(movies);
      res.status(200).json(createdMovies);
    } catch (e) {
      next(e);
    }
  }
}

export const movieController = new MoviesController();
