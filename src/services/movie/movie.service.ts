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

  getByPrams({offset, limit, sortBy, order, actors, title, search}: any){
    return MovieModel.findAll({
      offset,
      limit,
      order: [[sortBy, order]],
      where:
       {
         actors: { [Op.or]: [
           !search.length && {[Op.like]: `%${actors}%`},
           ...search.map((el: string) => {
             return {
               [Op.like]: `%${el}%`
             };
           })
         ] },
         title: { [Op.or]: [
           !search.length && {[Op.like]: `%${title}%`},
           search
         ]}
       }
    });
  }

  createMany(movies: any){
    return MovieModel.bulkCreate(movies);
  }

}

export const movieService = new MovieService();
