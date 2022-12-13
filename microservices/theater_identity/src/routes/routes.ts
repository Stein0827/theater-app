import { Router } from 'express';
import { login } from '../controllers/loginController';
import { registerUser } from '../controllers/registrationController';
import { deleteUser } from '../controllers/deleteUserController';

const router = Router();

router.get('/api/login', login);
router.post('/api/register', registerUser);
router.delete('/api/delete', deleteUser);

export {router};