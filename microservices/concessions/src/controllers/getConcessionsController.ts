import express, {Express, Request, Response} from 'express';
import {ConcessionGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { ConcessionModel } from '../models/ConcessionModel.js';

export const getConcessions = async (req: Request, res: Response) => {
    let resList: Array<Object | string > = [];

    try {
        const data: ConcessionGetBatchRequest = req.body;
        data.forEach(id => {
            let data_input = {snackId: id};
            const concessionModel = new ConcessionModel(data_input);
            const concession = concessionModel.getConcession();
            resList.push(concession)
        })
    } catch (err: any) {
        resList.push(err);  
    }

    res.status(202).send(resList);  
  }