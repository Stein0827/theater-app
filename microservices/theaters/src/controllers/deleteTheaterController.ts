import express, {Express, Request, Response} from 'express';
import {TheaterRequest} from '../types.js';
import {TheaterModel} from '../models/TheaterModel.js'
import * as dbe from '../data/dbComms.js';
import { publishEvent } from '../events/publishEvent.js';

export const deleteTheaters = async (req: Request, res: Response) => {
    try {
        const data: TheaterRequest = req.body;
        const theaterModel = new TheaterModel(data);
        console.log(theaterModel);
        const deletedTheater = await theaterModel.deleteTheater();
        await publishEvent("theaterDeleted", deletedTheater);
        res.status(200).send(deletedTheater);
    } catch (err) {
        res.status(400).send(err);
    }           
}