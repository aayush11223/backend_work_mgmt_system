import prisma from '../db.js';

// GET /attendance - find all attendance records for the logged-in user
export const getUserAttendance = (req, res) => {
    prisma.attendance.findMany({
        where: { userId: parseInt(req.query.userId) }
    })
        .then((records) => {
            res.status(200).json(records);
        })
        .catch((err) => {
            console.error('Error fetching attendance records:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// POST /attendance - create a new attendance record
export const createAttendance = (req, res) => {
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
};

// GET /attendance/all - GET all leaves for admin
export const getAllAttendance = (req, res) => {
    prisma.attendance.findMany({
        include: { user: { select: { name: true } } }
    })
        .then((records) => {
            res.status(200).json(records);
        })
        .catch((err) => {
            console.error('Error fetching all attendance:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// PATCH /attendance/:id - update an attendance record
export const updateAttendance = (req, res) => {
    prisma.attendance.update({
        where: { id: parseInt(req.params.id) },
        data: {
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            status: req.body.status,
        },
    })
        .then((record) => {
            res.status(200).json(record);
        })
        .catch((err) => {
            console.error('Error updating attendance record:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};
