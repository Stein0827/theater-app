
import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'

export const createMovie = async (req: Request, res: Response) => {
  try {
    const data: MovieRequest = req.body;
    const movieModel = new MovieModel(data);
    const newMovie = movieModel.createMovie();
    res.status(200).send(newMovie);
  } catch (err) {
    res.status(400).send(err);
  }    
}