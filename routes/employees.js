import express from 'express'
import { fetchEmployees, getEmployeeById, updateSalary } from '../controller/employeeController.js'

const router = express.Router();
// GET /employees
router.get('/', fetchEmployees);

// GET /employees/:id
router.get('/:id', getEmployeeById);

//PATCH salary
router.patch('/:id', updateSalary);

export default router;