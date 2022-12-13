import express, {Express, Request, Response} from 'express';
import { theaterAddedMovie, theaterRemovedMovie, theaterCreated, theaterDeleted } from '../../eventTypes.js';
import { ConfirmationModel } from '../models/ConfirmationModel';

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const model = new ConfirmationModel(event.eventData);
    let result = {};

    if (event.eventType === "paymentCreated") {
      result = `Theater created: ${await model.createConfirmation()}`
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }    
}