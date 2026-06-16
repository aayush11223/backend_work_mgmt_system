const express = require('express');
const prisma = require('../db');
const router = express.Router();

// GET /attendance - find all attendance records for the logged-in user
router.get('/', (req, res) => {
    prisma.attendance.findMany({
        where: {
            userId: parseInt(req.query.userId)
        }
    })
        .then((records) => {
            res.status(200).json(records);
        })
        .catch((err) => {
            console.error('Error fetching attendance records:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// POST /attendance - create a new attendance record
router.post('/', (req, res) => {
    prisma.attendance.create({
        data: {
            userId: parseInt(req.body.userId),
            date: req.body.date,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            status: req.body.status
        }
    })
        .then((record) => {
            res.status(201).json(record);
        })
        .catch((err) => {
            console.error('Error creating attendance record:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//GET all leaves for admin
router.get('/all', (req, res) => {
    prisma.attendance.findMany({
        include: {
            user: {
                select: { name: true }
            }
        }
    })
        .then((records) => {
            res.status(200).json(records);
        })
        .catch((err) => {
            console.error('Error fetching all attendance:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
