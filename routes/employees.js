const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController.js');

// GET /employees
router.get('/', employeeController.fetchEmployees);

// GET /employees/:id
router.get('/:id', employeeController.getEmployeeById);

module.exports = router;