import { Router } from 'express';

import { getSales } from '../controllers/getSalesController';

const router = Router();

router.get('/api/revenue', getSales);

export {router};