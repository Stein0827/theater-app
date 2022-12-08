import { Router } from 'express';

import { getSales } from '../controllers/getSalesController';
import { adminAuth } from '../auth/auth';

const router = Router();

// check if user if theater admin before executing endpoint
router.get('/api/revenue', adminAuth, getSales);

export {router};