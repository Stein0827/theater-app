import express, {Express, Request, Response} from 'express';
import {ConcessionRequest } from '../types.js';
import {ConcessionModel} from '../models/ConcessionModel.js'
import * as dbe from '../data/dbComms.js';
import { publishEvent } from '../events/publishEvent.js';

export const updateConcession = async (req: Request, res: Response) => {
    try {
        const data: ConcessionRequest = req.body;
        const concessionModel = new ConcessionModel(data);
        const newConcession = await concessionModel.updateConcession();
        await publishEvent("concessionUpdated", newConcession);
        res.status(200).send(newConcession);
    } catch (err) {
        res.status(400).send(err);
    }
}