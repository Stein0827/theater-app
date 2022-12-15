import express, {Express, Request, Response} from 'express';
import {TheaterRequest } from '../types.js';
import {TheaterModel} from '../models/TheaterModel.js'
import * as dbe from '../data/dbComms.js';
import { publishEvent } from '../events/publishEvent.js';

export const updateMoviesOfTheater = async (req: Request, res: Response) => {
    try {
        const data: TheaterRequest = req.body;
        data.theaterId = req.body._id;
        const theaterModel = new TheaterModel(data);
        const theater_obj = await theaterModel.updateMoviesOfTheater();
        await publishEvent("movieListUpdated", theater_obj);
        res.status(200).send(theater_obj);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}