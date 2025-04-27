import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || null;
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }        
        req.user = user;
        next();
    });
}