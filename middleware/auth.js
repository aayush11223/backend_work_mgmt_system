import prisma from '../db.js';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    // frontend's Axios interceptor attaches the token under the Authorization header. This line reads it out

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const userId = parseInt(token.split('-')[1]);

    prisma.user.findUnique({ where: { id: userId } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.error('Auth middleware error:', err);
            res.status(401).json({ error: 'Invalid token' });
        });
}

export default authMiddleware;
