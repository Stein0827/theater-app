import express, {Express, Request, Response} from 'express';
import { movieListUpdated, theaterCreated, theaterDeleted } from '../../eventTypes.js';
import { OperationsModel } from '../models/operationsModel.js';
import { OperationsRequest } from '../types.js';

function convertToOperationsModel(event:theaterCreated | theaterDeleted | movieListUpdated): OperationsRequest {
  if (event.eventType === "theaterCreated" || event.eventType === "theaterDeleted") {
    const eventData = (event as theaterCreated | theaterDeleted).eventData;
    let operationsRequest: OperationsRequest = {
      theater_id: eventData.theater_id
    }
    return operationsRequest
  } else if (event.eventType === "movieListUpdated") {
    const eventData = (event as movieListUpdated).eventData;
    let operationsRequest: OperationsRequest = {
      theater_id: eventData.theater_id,
      movie_id: eventData.movie_id
    }
    return operationsRequest
  } else {
    throw new Error("Error: No event matched in Confirmations Event Controller")
  }
}

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event: movieListUpdated | theaterCreated | theaterDeleted= req.body;
    const model = new OperationsModel(convertToOperationsModel(event));
    let result = undefined;

    if (event.eventType === "theaterCreated") {
      result = `Theater created: ${await model.createOperations()}`
    }

    if (event.eventType === "theaterDeleted") {
      result = `Theater created: ${await model.deleteTheaterOperations()}`
    }

    if (event.eventType === "movieListUpdated") {
      result = `Theater added movie: ${await model.updateOperations()}`
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }    
}