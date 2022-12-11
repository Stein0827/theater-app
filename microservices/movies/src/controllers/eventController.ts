import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    console.log("***TEMP*** Movies Controller Event Received", req.body);
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send(err);
  }    
}