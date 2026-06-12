const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/employees.json');

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8')
        .then((data) => res.status(200).json(JSON.parse(data)))
        .catch((err) => {
            console.error('Error reading employees file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;