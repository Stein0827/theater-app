import express, {Express, Request, Response} from 'express';
import { ConcessionRequest } from '../types.js';
import { ConcessionModel} from '../models/ConcessionModel.js'
import * as dbe from '../data/dbComms.js';

export const updateConcession = async (req: Request, res: Response) => {
    try {
        const data: ConcessionRequest = req.body;
        const concessionModel = new ConcessionModel(data);
        const newConcession = concessionModel.updateConcession();
        res.status(200).send(newConcession);
    } catch (err) {
        res.status(400).send(err);
    }
}