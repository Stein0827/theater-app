import { Request, Response} from 'express';
import {OperationsRequest } from '../types.js';
import {OperationsModel} from '../models/operationsModel'
import * as dbe from '../data/dbComms';

export const deleteOperations = async (req: Request, res: Response) => {
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
        res.status(400).send("Error: Request body does not include a valid id");
    } else {
        try {
            const operationsModel = new OperationsModel(data);
            const newOperations = operationsModel.deleteOperations();
            res.status(200).send(newOperations);
        } catch (err) {
            res.status(400).send("Error: database failure");
        }        
    }
    
}