import express, {Router, Request, Response} from 'express';
import { createPayment } from '../controllers/createPaymentController.js';

const router = Router();

router.post('/api/v1/payment', createPayment);

export {router};