
import express, {Express, Request, Response} from 'express';
import {MovieLocationRequest } from '../types.js';
import { TheaterLocationModel} from '../models/theaterLocationModel.js'

export const getLocalTheaters = async (req: Request, res: Response) => {
  let resList: TheaterLocationModel

  try {
    const data: MovieLocationRequest = req.body;
    const theaterLocationModel = new TheaterLocationModel(data);
    resList = theaterLocationModel.getLocalTheaters();
    res.status(200).send(resList.localTheatersList);
  } catch (err: any) {
    res.status(400).send(`${err.name}: ${err.message} with zipcode: ${err.list[0]}`);
  }
}

