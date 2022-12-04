import express, {Express, Request, Response} from 'express';
import {TheaterGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { TheaterModel } from '../models/TheaterModel.js';

export const getTheaters = async (req: Request, res: Response) => {
    let resList: Array<Object | string > = [];

    try {
        const data: TheaterGetBatchRequest = req.body;
        data.forEach(id => {
            let data_input = {theaterId: id};
            const movieModel = new TheaterModel(data_input);
            const movie = movieModel.getTheater();
            resList.push(movie)
        })
    } catch (err: any) {
        resList.push(err);  
    }

    res.status(202).send(resList);  
  }