import {Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel.js'

export const createOperations = async (req: Request, res: Response) => {
  const data: OperationsRequest = req.body;

  // if data doesn't have all operations attributes, return error
  const required_attributes = new Set(["movie_id", "theater_id", "operations"]);
  let invalid = false;
  required_attributes.forEach(attribute => {
    if (!(attribute in data) || data[attribute as keyof typeof data] === "") {
      invalid = true;
    }
  });

  if (invalid) {
    res.status(400).send("Error: Request body does not included all required attributes");
  } else {
    try {
      const operationsModel = new OperationsModel(data);
      const newOperations = operationsModel.createOperations();
      res.status(200).send(newOperations);
    } catch (err) {
      res.status(400).send("Error: error creating movie in database");
    }    
  }
}