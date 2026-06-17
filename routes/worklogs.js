const express = require('express');
const prisma = require('../db');
const router = express.Router();

// GET /worklogs - find worklogs for the logged-in user
router.get('/', (req, res) => {
    prisma.workLog.findMany({
        where: { userId: parseInt(req.query.userId) },
    })
        .then((logs) => {
            res.status(200).json(logs);
        })
        .catch((err) => {
            console.error('Error fetching worklogs:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// GET /worklogs/all - find all worklogs for admin
router.get('/all', (req, res) => {
    prisma.workLog.findMany({
        include: {
            user: {
                select: { name: true },
            },
        },
    })
        .then((logs) => {
            res.status(200).json(logs);
        })
        .catch((err) => {
            console.error('Error fetching all worklogs:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// POST /worklogs - create a new worklog
router.post('/', (req, res) => {
    prisma.workLog.create({
        data: {
            userId: parseInt(req.body.userId),
            date: (req.body.date),
            description: req.body.description,
            units: req.body.units,
            hours: req.body.hours,
        },
    })
        .then((log) => {
            res.status(201).json(log);
        })
        .catch((err) => {
            console.error('Error creating worklog:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;