import express, {Express, Request, Response} from 'express';
import {TheaterGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { TheaterModel } from '../models/TheaterModel.js';

export async function getTheaters (req: Request, res: Response) {
    const resList: Array<Object | string > = [];
    const data: TheaterGetBatchRequest = req.body;
    for (const id of data) {
        try {
            let data_input = {theaterId: id};
            const theaterModel = new TheaterModel(data_input);
            const theater = await theaterModel.getTheater();
            resList.push(theater as object);
        }
        catch (err: any) {
            resList.push(err);
        }
    }
    res.status(202).send(resList);  
}