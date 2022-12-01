import express, {Router, Request, Response} from 'express';
import { createOperations } from '../controllers/createOperationsController.js';
import { deleteOperations } from '../controllers/deleteOperationsController.js';
import { getOperations} from '../controllers/getOperationsController.js';
import { updateOperations } from '../controllers/updateOperationsController.js';
import { getAllOperations } from '../controllers/getAllOperationsController.js';

const router = Router();

router.post('/api/v1/operations', createOperations);
router.put('/api/v1/operations', updateOperations);
router.get('/api/v1/operations', getOperations);
router.get('/api/v1/operations', getAllOperations);
router.delete('/api/v1/operations', deleteOperations);

export {router};