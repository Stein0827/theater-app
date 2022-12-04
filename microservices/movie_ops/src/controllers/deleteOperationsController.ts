import { Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel'

export const deleteOperations = async (req: Request, res: Response) => {
    try {
        const data: OperationsRequest = req.body;
        const operationsModel = new OperationsModel(data);
        const newOperations = operationsModel.deleteOperations();
        res.status(200).send(newOperations);
    } catch (err) {
        res.status(400).send(err);
    }
}