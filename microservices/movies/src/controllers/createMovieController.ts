
import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'

export const createMovie = async (req: Request, res: Response) => {
  const data: MovieRequest = req.body;

  // data doesn't have all movie attributes except id, return error
  const required_attributes = new Set(["name", "desc", "length", "rating", "trailer"]);
  let invalid = false;
  required_attributes.forEach(attribute => {
    if (!(attribute in data) || data[attribute as keyof typeof data] === "") {
      invalid = true;
    }
  });

  // on success return entity with generated id, may want to use a try catch in 
  // case there is an error with the database
  if (invalid) {
    res.status(400).send("Error: Request body does not included all required attributes");
  } else {
    try {
      const movieModel = new MovieModel(data);
      const newMovie = movieModel.createMovie();
      res.status(200).send(newMovie);
    } catch (err) {
      res.status(400).send("Error: error creating movie in database");
    }    
  }
}