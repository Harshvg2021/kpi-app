import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt.js';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
