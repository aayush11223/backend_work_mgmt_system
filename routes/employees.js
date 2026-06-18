const express = require('express');
const prisma = require('../db');
const router = express.Router();

// GET /employees - find all employees
router.get('/', (req, res) => {
    prisma.employee.findMany()
        .then((employees) => {
            res.status(200).json(employees);
        })
        .catch((err) => {
            console.error('Error fetching employees:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// GET /employees/:id - find a single employee
router.get('/:id', (req, res) => {
    prisma.employee.findUnique({
        where: { id: parseInt(req.params.id) },
    })
        .then((employee) => {
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.status(200).json(employee);
        })
        .catch((err) => {
            console.error('Error fetching employee:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;