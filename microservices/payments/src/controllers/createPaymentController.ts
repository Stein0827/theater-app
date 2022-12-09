import express, {Express, Request, Response} from 'express';
import {PaymentRequest } from '../types.js';
import {PaymentModel} from '../models/paymentModel.js'

export const createPayment = async (req: Request, res: Response) => {
  try {
    const data: PaymentRequest = req.body;
    const paymentModel = new PaymentModel(data);
    const newPayment = await paymentModel.createPayment().catch((err)=> {throw err});
    res.status(200).send(newPayment);
  } catch (err) {
    res.status(400).send(err);
  }       
}