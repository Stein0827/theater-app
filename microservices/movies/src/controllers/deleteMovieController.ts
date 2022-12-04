import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'
import * as dbe from '../data/dbComms.js';

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const data: MovieRequest = req.body;
        const movieModel = new MovieModel(data);
        movieModel.deleteMovie();
        res.status(200).send("Success: Movie Deleted");
    } catch (err) {
        res.status(400).send(err);
    }           
}