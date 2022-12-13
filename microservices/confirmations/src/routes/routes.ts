import express, {Router, Request, Response} from 'express';
import { createConfirmation } from '../controllers/createConfirmationController.js';
import { deleteConfirmation } from '../controllers/deleteConfirmationController.js';
import { getConfirmations } from '../controllers/getConfirmationsController.js';
import { respondToEvent } from '../controllers/eventController.js';

const router = Router();

router.post('/api/v1/confirmation', createConfirmation);
router.get('/api/v1/confirmation', getConfirmations);
router.delete('/api/v1/confirmation', deleteConfirmation);
router.post('/api/v1/event', respondToEvent);

export {router};