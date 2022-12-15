import { Router } from 'express';

import { getSales } from '../controllers/getSalesController.js';
import { eventController } from '../controllers/eventController.js';

const router = Router();

// check if user is theater admin before executing endpoint
router.get('/api/revenue', getSales);
router.post('/api/v1/events', eventController);

export {router};