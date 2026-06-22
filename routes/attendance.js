const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendanceController.js');

// Fetch user attendance
router.get('/', attendanceController.getUserAttendance);

// Create new attendance
router.post('/', attendanceController.createAttendance);

// Fetch all attendance records (Admin view)
router.get('/all', attendanceController.getAllAttendance);

// Update a single attendance record by ID
router.patch('/:id', attendanceController.updateAttendance);

module.exports = router;
