import express, {Express, Request, Response} from 'express';
import {ConfirmationGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { ConfirmationModel } from '../models/ConfirmationModel.js';

export const getConfirmations = async (req: Request, res: Response) => {
    let resList: Array<Object | string > = [];

    try {
        const data: ConfirmationGetBatchRequest = req.body;
        data.forEach(id => {
            let data_input = {confirmationId: id};
            const confirmationModel = new ConfirmationModel(data_input);
            const confirmation = confirmationModel.getConfirmation();
            resList.push(confirmation)
        })
    } catch (err: any) {
        resList.push(err);  
    }

    res.status(202).send(resList);  
  }