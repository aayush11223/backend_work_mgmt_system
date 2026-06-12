
const express = require('express');


const fs = require('fs').promises;

const path = require('path'); //used for cross OS path, joininig paths, coverting realtive path to absolute path

const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');
//__dirname is a Node.js built-in variable that gives the absolute path of the current file's

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    fs.readFile(usersFilePath, 'utf8') //reads the users.json and utf8 is required to convert raw data into readable format
        .then((data) => {
            const users = JSON.parse(data);
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Create a copy to avoid sending sensitive password data back
            const userResponse = { ...user };
            delete userResponse.password;

            const fakeToken = `fake-jwt-token-for-${userResponse.email}-${Date.now()}`;

            res.status(200).json({
                user: userResponse,
                token: fakeToken
            });
        })
        .catch((err) => {
            console.error('Error reading users file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
