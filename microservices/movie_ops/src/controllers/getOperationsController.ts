import {Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel.js'
import * as dbe from '../data/dbComms.js';

export const getOperations = async (req: Request, res: Response) => {
    try {
      const data: OperationsRequest = req.body;
      const operationsModel = new OperationsModel(data);
      const operations = await operationsModel.getOperations();
      res.status(200).send(operations);
    } catch (err) {
      res.status(400).send(err);
    }
}