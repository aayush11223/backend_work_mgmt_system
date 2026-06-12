// GET /worklogs — returns all worklogs
// POST /worklogs — adds a new worklog

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/worklogs.json');

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
                //it permanently writes the POST data of a user in worklogs.json
                .then(() => res.status(201).json(newRecord));
        })
        .catch((err) => {
            console.error('Error updating attendance file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});



module.exports = router;