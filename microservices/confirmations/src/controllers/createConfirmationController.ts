
import express, {Express, Request, Response} from 'express';
import { ConfirmationRequest } from '../types.js';
import {ConfirmationModel} from '../models/ConfirmationModel'

export const createConfirmation = async (req: Request, res: Response) => {
  try {
    const data: ConfirmationRequest = req.body;
    const confirmationModel = new ConfirmationModel(data);
    const newConfirmation = await confirmationModel.createConfirmation();
    res.status(200).send(newConfirmation);
  } catch (err) {
    res.status(400).send(err);
  }    
}