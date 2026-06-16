const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const { password: _, ...userResponse } = user;
        const token = `token-${user.id}`;

        res.status(200).json({ user: userResponse, token });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/me', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const userId = parseInt(token.split('-')[1]);

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password: _, ...userResponse } = user;
        res.status(200).json(userResponse);

    } catch (err) {
        console.error('Auth me error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
