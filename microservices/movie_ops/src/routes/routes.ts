import express, {Router, Request, Response} from 'express';
import { respondToEvent } from '../controllers/eventController.js';
import { createOperations } from '../controllers/createOperationsController.js';
import { deleteOperations } from '../controllers/deleteOperationsController.js';
import { getOperations} from '../controllers/getOperationsController.js';
import { updateOperations } from '../controllers/updateOperationsController.js';
import { getAllOperations } from '../controllers/getAllOperationsController.js';
import { deleteTheaterOperations } from '../data/dbComms.js';

const router = Router();

router.post('/api/v1/event', respondToEvent);
router.post('/api/v1/operations', createOperations);
router.put('/api/v1/operations', updateOperations);
router.get('/api/v1/operations', getOperations);
router.get('/api/v1/operations/all', getAllOperations);
router.delete('/api/v1/operations', deleteOperations);
router.delete('/api/v1/operations/theater', deleteTheaterOperations);

export {router};