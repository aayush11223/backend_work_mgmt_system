import prisma from '../db.js';

// Fetch all employees
export const fetchEmployees = (req, res) => {
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
export const getEmployeeById = (req, res) => {
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

//update salary
export function updateSalary(req, res) {
    const id = parseInt(req.params.id);
    const salary = parseInt(req.body.salary);

    prisma.employee
        .update({
            where: { id },
            data: { salary },
        })
        .then((employee) => {
            res.status(200).json(employee);
        });
}


