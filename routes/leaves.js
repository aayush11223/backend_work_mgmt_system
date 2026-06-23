import express from 'express';
import { fetchAllLeaves, fetchLeaves, applyLeave, updateLeaveStatus } from '../controller/leaveController.js';

const router = express.Router();
// GET /leaves/all
router.get('/all', fetchAllLeaves);

// GET /leaves
router.get('/', fetchLeaves);

// POST /leaves
router.post('/', applyLeave);

// PATCH /leaves/:id
router.patch('/:id', updateLeaveStatus);

export default router;