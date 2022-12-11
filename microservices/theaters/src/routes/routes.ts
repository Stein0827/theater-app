import express, {Router, Request, Response} from 'express';
import { createTheater } from '../controllers/createTheaterController.js';
import { respondToEvent } from '../controllers/eventController.js';
import { deleteTheaters } from '../controllers/deleteTheaterController.js';
import { getTheaters } from '../controllers/getTheatersController.js';
import { updateTheater } from '../controllers/updateTheatersController.js';
import { getAllTheaters } from '../controllers/getAllTheatersController.js';

const router = Router();

router.post('/api/v1/event', respondToEvent);
router.post('/api/v1/theater', createTheater);
router.put('/api/v1/theater', updateTheater);
router.get('/api/v1/theaters', getTheaters);
router.get('/api/v1/theaters/all', getAllTheaters);
router.delete('/api/v1/theater', deleteTheaters);

export {router};