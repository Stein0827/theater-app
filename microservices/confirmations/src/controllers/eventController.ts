import {Request, Response} from 'express';
import { paymentCreated, PaymentModel } from '../../eventTypes.js';
import { ConfirmationModel } from '../models/ConfirmationModel.js';
import { ConfirmationRequest } from '../types.js';

function convertToConfirmationModel(event: paymentCreated): ConfirmationRequest {
  if (event.eventType === "paymentCreated") {
    const eventData: PaymentModel = (event as paymentCreated).eventData;
    let confirmationRequest: ConfirmationRequest = {
      movieId: eventData.movie_id,
      theaterId: eventData.theater_id,
      creditCard: eventData.cardnum,
      billingAddr: eventData.bstreet,
      price: eventData.tickets,
      email: eventData.email
    }

    return confirmationRequest
  } else {
    throw new Error("Error: No event matched in Confirmations Event Controller")
  }
}

export const respondToEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const model = new ConfirmationModel(convertToConfirmationModel(event));
    console.log("Confirmations Event Controller Built Model", model)
    let result = {};

    if (event.eventType === "paymentCreated") {
      result = `Theater created: ${await model.createConfirmation()}`
    }

    if (result === undefined) {
      result = "Error: This event was not handled"
    }
    
    res.status(200).send(result);
  } catch (err) {
    console.log("ERROR: CONFIRMATION SERVICE EVENT CONTROLLER", err);
    
    res.status(400).send(err);
  }    
}