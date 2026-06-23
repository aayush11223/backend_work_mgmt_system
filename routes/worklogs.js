import express from 'express';
import { fetchWorklogs, logWork, fetchAllLogs } from '../controller/worklogsController.js';

const router = express.Router();
// Fetch user worklogs
router.get('/', fetchWorklogs);

// Create new worklog
router.post('/', logWork);

// Fetch all worklogs (Admin view)
router.get('/all', fetchAllLogs);

export default router