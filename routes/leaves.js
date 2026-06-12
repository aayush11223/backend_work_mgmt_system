const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/leaves.json');

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8')
        .then((data) => res.status(200).json(JSON.parse(data)))
        .catch((err) => {
            console.error('Error reading attendance file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.post('/', (req, res) => {
    fs.readFile(filePath, 'utf8')
        .then((data) => {
            const records = JSON.parse(data);

            const newRecord = {
                id: records.length + 1,
                ...req.body, //adds up the value POST by user
            };

            records.push(newRecord);

            return fs.writeFile(filePath, JSON.stringify(records))
                //it permanently writes the POST data of a user in leave.json
                .then(() => res.status(201).json(newRecord));
        })
        .catch((err) => {
            console.error('Error updating attendance file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.patch('/:id', (req, res) => {
    const leaveId = parseInt(req.params.id, 10);
    //here,we have dynamic id, and URL always treats link as a string, thus parseInt is used to convert into whole number and 10 means whole number base 10 decimal number
    const { status } = req.body;
    fs.readFile(filePath, 'utf8')
        .then((data) => {
            const records = JSON.parse(data);
            const leaveIndex = records.findIndex((r) => r.id === leaveId);
            if (leaveIndex === -1) {
                return res.status(404).json({ error: 'Leave request not found' });
            }
            // Update status
            records[leaveIndex].status = status || records[leaveIndex].status;
            //.status: This accesses the status property (e.g., "Pending", "Approved") of that specific record.
            //This line of JavaScript code updates the status of a specific item in a list (array) of records
            return fs.writeFile(filePath, JSON.stringify(records))
                .then(() => res.status(200).json(records[leaveIndex]));
        })
        .catch((err) => {
            console.error('Error updating leave status:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;