import express, {Express, Request, Response} from 'express';
import {TheaterRequest } from '../types.js';
import {TheaterModel} from '../models/TheaterModel.js'
import * as dbe from '../data/dbComms.js';

export const updateTheater = async (req: Request, res: Response) => {
    try {
        const data: TheaterRequest = req.body;
        const theaterModel = new TheaterModel(data);
        const newTheater = await theaterModel.updateTheater();
        res.status(200).send(newTheater);
    } catch (err) {
        res.status(400).send(err);
    }
}