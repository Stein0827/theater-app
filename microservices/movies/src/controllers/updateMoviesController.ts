import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'
import * as dbe from '../data/dbComms.js';

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const data: MovieRequest = req.body;
        const movieModel = new MovieModel(data);
        const result = await movieModel.updateMovie();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
}