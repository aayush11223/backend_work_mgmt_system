import express from 'express'
import { fetchEmployees, getEmployeeById } from '../controller/employeeController.js'

const router = express.Router();
// GET /employees
router.get('/', fetchEmployees);

// GET /employees/:id
router.get('/:id', getEmployeeById);

export default router;