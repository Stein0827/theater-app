import { Router } from 'express';

import { login } from '../controllers/loginController';
import { registerUser } from '../controllers/registrationController';

const router = Router();

router.get('/api/login', login);
router.post('/api/register', registerUser);

export {router};