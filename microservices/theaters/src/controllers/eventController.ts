import express, {Express, Request, Response} from 'express';
import { TheaterRequest } from '../types.js';
import { TheaterModel } from '../models/TheaterModel'

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    console.log("***TEMP*** Theaters Controller Event Received", req.body);
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send(err);
  }    
}