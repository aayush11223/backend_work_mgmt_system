import express from 'express';
import { login, initAuth } from '../controller/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', initAuth);

export default router
