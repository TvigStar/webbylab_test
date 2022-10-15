import { MovieModel } from '../../database';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class MovieService {
  createMovie(movie: any): Promise<MovieModel>{
    return MovieModel.create(movie);
  }

  findMovieByParam(findObject: any): Promise<MovieModel | null> {
    return MovieModel.findOne({where: findObject});
  }

  delete(id: number){
    return MovieModel.destroy({ where: { id } });
  }

  updateById(id: number, updateObj: Promise<MovieModel | null>){
    return MovieModel.update(updateObj, {where: { id}} );
  }

  getByPrams({offset, limit, sortBy, order, filter, search}: any){
    return MovieModel.findAll({
      offset,
      limit,
      order: [[sortBy, order]],
      where:
       { [Op.or]:
        [
          {actors: { [Op.like]: `%${filter.actor || search}%` }},
          {title: { [Op.like]: `%${filter.title || search}%` }}
        ]
       }
    });
  }

  createMany(movies: any){
    return MovieModel.bulkCreate(movies);
  }

}

export const movieService = new MovieService();
