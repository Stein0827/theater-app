
import express, {Express, Request, Response} from 'express';
import { ConcessionRequest } from '../types.js';
import {ConcessionModel} from '../models/ConcessionModel'

export const createConcession = async (req: Request, res: Response) => {
  try {
    const data: ConcessionRequest = req.body;
    const concessionModel = new ConcessionModel(data);
    const newConcession = await concessionModel.createConcession();
    console.log("this is in create theater: " + newConcession);
    res.status(200).send(newConcession);
  } catch (err) {
    res.status(400).send(err);
  }    
}