import express, {Express, Request, Response} from 'express';
import { TheaterRequest } from '../types.js';
import { TheaterModel } from '../models/TheaterModel.js'
import { publishEvent } from '../events/publishEvent.js';

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const model = new TheaterModel(event.eventData);
    let result;

    if (event.eventType === "userCreated") {
      result = await model.createTheater();
      await publishEvent("theaterWithId", {"username": event.eventData.username, "theater_id": result.id.toString()});
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }    
}