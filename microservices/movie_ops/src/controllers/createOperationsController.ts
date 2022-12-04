import {Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel.js'

export const createOperations = async (req: Request, res: Response) => {
  try {
    const data: OperationsRequest = req.body;
    const operationsModel = new OperationsModel(data);
    const newOperations = operationsModel.createOperations();
    res.status(200).send(newOperations);
  } catch (err) {
    res.status(400).send(err);
  }    
}