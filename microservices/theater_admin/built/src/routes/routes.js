import { Router } from 'express';
import { getSales } from '../controllers/getSalesController.js';
import { eventController } from '../controllers/eventController.js';
import { adminAuth } from '../auth/auth.js';
const router = Router();
// check if user is theater admin before executing endpoint
router.get('/api/revenue', adminAuth, getSales);
router.post('/api/v1/events', eventController);
export { router };
