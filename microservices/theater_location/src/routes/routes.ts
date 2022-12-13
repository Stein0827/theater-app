import { Router } from 'express';
import { getLocalTheaters } from '../controllers/getLocalTheaterController.js';
import { eventController } from '../controllers/eventController.js';

const router = Router();

router.get('/api/theaters/locate', getLocalTheaters);
router.post('/api/v1/events', eventController);

export {router};