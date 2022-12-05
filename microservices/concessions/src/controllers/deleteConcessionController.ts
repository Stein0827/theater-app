import express, {Express, Request, Response} from 'express';
import {ConcessionRequest} from '../types.js';
import { ConcessionModel } from '../models/ConcessionModel.js'
import * as dbe from '../data/dbComms.js';

export const deleteConcession = async (req: Request, res: Response) => {
    try {
        const data: ConcessionRequest = req.body;
        const concessionModel = new ConcessionModel(data);
        concessionModel.deleteConcession();
        res.status(200).send("Success: concession Deleted");
    } catch (err) {
        res.status(400).send(err);
    }           
}