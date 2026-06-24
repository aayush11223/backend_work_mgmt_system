import express from 'express';
import { getPaycheck } from '../controller/paycheckController.js';

const router = express.Router();

router.get('/', getPaycheck);

export default router;