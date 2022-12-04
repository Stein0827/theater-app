
import express, {Express, Request, Response} from 'express';
import {TheaterRequest } from '../types.js';
import {TheaterModel} from '../models/TheaterModel.js'

export const createTheater = async (req: Request, res: Response) => {
  try {
    const data: TheaterRequest = req.body;
    const theaterModel = new TheaterModel(data);
    const newTheater = theaterModel.createTheater();
    console.log(newTheater);
    res.status(200).send(newTheater);
  } catch (err) {
    res.status(400).send(err);
  }    
}