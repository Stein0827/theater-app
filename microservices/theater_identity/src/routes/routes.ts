import { Router } from 'express';
import { login } from '../controllers/loginController.js';
import { registerUser } from '../controllers/registrationController.js';
import { deleteUser } from '../controllers/deleteUserController.js';
import { eventController } from '../controllers/eventController.js';

const router = Router();

router.get('/api/login', login);
router.post('/api/register', registerUser);
router.delete('/api/delete', deleteUser);
router.post('/api/v1/events', eventController);

export {router};