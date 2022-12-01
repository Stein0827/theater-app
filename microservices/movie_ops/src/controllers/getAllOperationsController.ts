import {Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel.js'
import * as dbe from '../data/dbComms.js';

export const getAllOperations = async (req: Request, res: Response) => {
    try {
        const result = dbe.getAllOperations();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send("ERROR: database query failed")
    }
}