import express, {Express, Request, Response} from 'express';
import {ConfirmationRequest} from '../types.js';
import * as dbe from '../data/dbComms.js';
import { ConfirmationModel } from '../models/ConfirmationModel.js';

export const deleteConfirmation = async (req: Request, res: Response) => {
    try {
        const data: ConfirmationRequest = req.body;
        const confirmationModel = new ConfirmationModel(data);
        confirmationModel.deleteConfirmation();
        res.status(200).send("Success: confirmation Deleted");
    } catch (err) {
        res.status(400).send(err);
    }           
}