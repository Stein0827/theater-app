import express, {Router, Request, Response} from 'express';
import { createPayment } from '../controllers/createPaymentController.js';
import { getPayment } from '../controllers/getPaymentController';

const router = Router();

router.post('/api/v1/payment', createPayment);
router.get('/api/v1/payment', getPayment);

export {router};