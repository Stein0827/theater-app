import {Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel.js'

export const updateOperations = async (req: Request, res: Response) => {
  try {
    const data: OperationsRequest = req.body;
    const operationsModel = new OperationsModel(data);
    const updatedOperations = operationsModel.updateOperations();
    res.status(200).send(updatedOperations);
  } catch (err) {
    res.status(400).send(err);
  }    
}