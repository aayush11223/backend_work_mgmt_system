const express = require('express');
const router = express.Router();
const leaveController = require('../controller/leaveController.js');

// GET /leaves/all
router.get('/all', leaveController.fetchAllLeaves);

// GET /leaves
router.get('/', leaveController.fetchLeaves);

// POST /leaves
router.post('/', leaveController.applyLeave);

// PATCH /leaves/:id
router.patch('/:id', leaveController.updateLeaveStatus);

module.exports = router;