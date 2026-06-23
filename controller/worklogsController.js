import prisma from '../db.js';

// GET /worklogs - find all worklogs for the logged-in user
export const fetchWorklogs = (req, res) => {
    prisma.workLog.findMany({
        where: { userId: parseInt(req.query.userId) }
    })
        .then((logs) => {
            res.status(200).json(logs);
        })
        .catch((err) => {
            console.error('Error fetching worklogs:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// POST /worklogs - create a new worklog
export const logWork = (req, res) => {
    prisma.workLog.create({
        data: {
            userId: parseInt(req.body.userId),
            date: req.body.date,
            description: req.body.description,
            units: parseInt(req.body.units),
            hours: parseFloat(req.body.hours)
        }
    })
        .then((log) => {
            res.status(201).json(log);
        })
        .catch((err) => {
            console.error('Error creating worklog:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// GET /worklogs/all - get all worklogs for admin
export const fetchAllLogs = (req, res) => {
    prisma.workLog.findMany({
        include: { user: { select: { name: true } } }
    })
        .then((logs) => {
            res.status(200).json(logs);
        })
        .catch((err) => {
            console.error('Error fetching all worklogs:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};