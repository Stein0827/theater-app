import { Router } from 'express';

import { login } from '../controllers/loginController';

const router = Router();

router.get('/api/login', login);

export {router};