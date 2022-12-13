import express, {Express, Request, Response} from 'express';
import { ConcessionGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { ConcessionModel } from '../models/ConcessionModel.js';

export async function getConcessions (req: Request, res: Response) {
    const resList: Array<Object | string > = [];
    const data: ConcessionGetBatchRequest = req.body;
    for (const id of data) {
        try {
            let data_input = {snackId: id};
            const concessionModel = new ConcessionModel(data_input);
            const concession = await concessionModel.getConcession();
            resList.push(concession as object);
        }
        catch (err: any) {
            resList.push(err);
        }
    }
    res.status(202).send(resList);  
}