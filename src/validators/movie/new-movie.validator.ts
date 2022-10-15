import * as Joi from 'joi';

export const newMovieValidator = Joi.object({
  title: Joi.string().trim().min(2).max(99).required(),
  format: Joi.string().valid('DVD','VHS', 'Blu-ray').required(),
  year: Joi.number().required(),
  actors: Joi.array().required()
});
