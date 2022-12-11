
import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js';
import { publishEvent } from '../events/publishEvent.js';

export const createMovie = async (req: Request, res: Response) => {
  try {
    const data: MovieRequest = req.body;
    const movieModel = new MovieModel(data);
    const newMovie: MovieModel = await movieModel.createMovie().catch((err)=> {throw err});

    await publishEvent("movieCreated", newMovie);
    
    res.status(200).send(newMovie);
  } catch (err) {
    res.status(400).send(err);
  }    
}