const express = require('express');
const router = express.Router();
const worklogsController = require('../controller/worklogsController.js');

// Fetch user worklogs
router.get('/', worklogsController.fetchWorklogs);

// Create new worklog
router.post('/', worklogsController.logWork);

// Fetch all worklogs (Admin view)
router.get('/all', worklogsController.fetchAllLogs);

module.exports = router;