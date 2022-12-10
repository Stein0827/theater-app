import { Router } from 'express';
import { subscribeService } from '../controllers/subscriptionController';
import { publishService } from '../controllers/publishController';

const router = Router();

router.post('/api/v1/subscribe', subscribeService);
router.post('/api/v1/publish', publishService);

export {router};