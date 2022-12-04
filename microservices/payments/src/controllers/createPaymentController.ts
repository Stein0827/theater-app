import express, {Express, Request, Response} from 'express';
import {PaymentRequest } from '../types.js';
import {PaymentModel} from '../models/paymentModel.js'

export const createPayment = async (req: Request, res: Response) => {
  const data: PaymentRequest = req.body;

  try {
    const paymentModel = new PaymentModel(data);
    const payment = paymentModel.createPayment();
    res.status(200).send(payment);
  } catch (err) {
    res.status(400).send("Error: error creating movie in database");
  }    
}