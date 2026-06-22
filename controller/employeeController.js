const prisma = require('../db');

// Fetch all employees
exports.fetchEmployees = (req, res) => {
    prisma.employee.findMany()
        .then((employees) => {
            res.status(200).json(employees);
        })
        .catch((err) => {
            console.error('Error fetching employees:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Fetch a single employee by ID
exports.getEmployeeById = (req, res) => {
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
};