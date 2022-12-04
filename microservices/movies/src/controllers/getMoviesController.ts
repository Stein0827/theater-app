import express, {Express, Request, Response} from 'express';
import {MovieGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { MovieModel } from '../models/movieModel.js';

export const getMovies = async (req: Request, res: Response) => {
    let resList: Array<Object | string > = [];

    try {
        const data: MovieGetBatchRequest = req.body;
        data.forEach(id => {
            let data_input = {movie_id: id};
            const movieModel = new MovieModel(data_input);
            const movie = movieModel.getMovie();
            resList.push(movie)
        })
    } catch (err: any) {
        resList.push(err);  
    }

    res.status(202).send(resList);  
  }