const prisma = require('../db');

// Fetch all leaves
exports.fetchAllLeaves = (req, res) => {
    prisma.leave.findMany()
        .then((leaves) => {
            res.status(200).json(leaves);
        })
        .catch((err) => {
            console.error('Error fetching all leaves:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Fetch leaves for a specific user
exports.fetchLeaves = (req, res) => {
    prisma.leave.findMany({
        where: { userId: parseInt(req.query.userId) },
    })
        .then((leaves) => {
            res.status(200).json(leaves);
        })
        .catch((err) => {
            console.error('Error fetching leaves:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Create a new leave request
exports.applyLeave = (req, res) => {
    prisma.leave.create({
        data: {
            userId: parseInt(req.body.userId),
            type: req.body.type,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            reason: req.body.reason,
            status: 'pending',
        },
    })
        .then((leave) => {
            res.status(201).json(leave);
        })
        .catch((err) => {
            console.error('Error creating leave:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Update leave status by ID
exports.updateLeaveStatus = (req, res) => {
    prisma.leave.update({
        where: { id: parseInt(req.params.id) },
        data: { status: req.body.status },
    })
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            console.error('Error updating leave:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};