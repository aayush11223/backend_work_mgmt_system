import express from 'express'
const router = express.Router();
import { getUserAttendance, createAttendance, getAllAttendance, updateAttendance } from '../controller/attendanceController.js'

// Fetch user attendance
router.get('/', getUserAttendance);

// Create new attendance
router.post('/', createAttendance);

// Fetch all attendance records (Admin view)
router.get('/all', getAllAttendance);

// Update a single attendance record by ID
router.patch('/:id', updateAttendance);

export default router;
