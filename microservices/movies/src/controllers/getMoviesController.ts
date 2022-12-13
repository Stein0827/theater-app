import express, {Express, Request, Response} from 'express';
import {MovieGetBatchRequest } from '../types.js';
import { MovieModel } from '../models/movieModel.js';

export const getMovies = async (req: Request, res: Response) => {
    let resList: Array<Object | string > = [];

    const data: MovieGetBatchRequest = req.body;

    for (const id of data) {
        let data_input = {movie_id: id};
        const movieModel = new MovieModel(data_input);
        try {
            const result = await movieModel.getMovie();
            resList.push(result);
        } catch (err: any) {
            resList.push(err);
        }
    }

    res.status(202).send(resList);  
}