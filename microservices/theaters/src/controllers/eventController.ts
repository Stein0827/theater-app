import express, {Express, Request, Response} from 'express';
import { TheaterRequest } from '../types.js';
import { TheaterModel } from '../models/TheaterModel'

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const model = new TheaterModel(event.eventData);
    let result = {};

    if (event.eventType === "userCreated") {
      result = `Theater created: ${await model.createTheater()}`
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }    
}