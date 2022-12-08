import express, {Express, Request, Response} from 'express';
import { ConcessionRequest} from '../types.js';
import {ConcessionModel} from '../models/ConcessionModel'
import * as dbe from '../data/dbComms.js';

export const deleteConcession = async (req: Request, res: Response) => {
    try {
        const data: ConcessionRequest = req.body;
        const concessionModel = new ConcessionModel(data);
        console.log(concessionModel);
        const ack = await concessionModel.deleteConcession();
        res.status(200).send(ack);
    } catch (err) {
        res.status(400).send(err);
    }           
}