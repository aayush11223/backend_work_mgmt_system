import prisma from '../db.js';
import bcrypt from 'bcrypt';

export const login = (req, res) => {
    // console.log("this is here")
    const { email, password } = req.body;
    console.log(email)

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    prisma.user.findUnique({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid password' });
                    }

                    const { password: _, ...userResponse } = user;
                    const token = `token-${user.id}`;
                    return res.status(200).json({ user: userResponse, token });
                });
        })
        .catch(err => {
            console.error('Login error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        });
};

export const initAuth = (req, res) => {
    const token = req.headers?.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const userId = parseInt(token.split('-')[1]);

    prisma.user.findUnique({ where: { id: userId } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const { password: _, ...userResponse } = user;
            return res.status(200).json(userResponse);
        })
        .catch(err => {
            console.error('Auth me error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        });
};


