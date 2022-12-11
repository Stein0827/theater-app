import express, {Express, Request, Response} from 'express';
import { theaterAddedMovie, theaterRemovedMovie, theaterCreated } from '../../../eventTypes.js';
import { OperationsModel } from '../models/operationsModel.js';

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event: theaterAddedMovie | theaterRemovedMovie | theaterCreated = req.body;
    const model = new OperationsModel(event.eventData);
    let result = undefined;

    if (event.eventType === "theaterAddedMovie") {
      result = `Theater added movie: ${await model.updateOperations()}`
    }

    if (event.eventType === "theaterRemovedMovie") {
      result = `Theater removed movie: ${await model.deleteOperations()}`
    }

    if (event.eventType === "theaterCreated") {
      result = `Theater created: ${await model.createOperations()}`
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }    
}