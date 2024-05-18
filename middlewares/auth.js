import jwt from 'jsonwebtoken';
import { ValidationError, checkBlacklistedTokens } from '../utils/utils.js';

export async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if(err) return res.status(401).send({ message: 'User not authorized', error: err.message});
    
    const verifyToken = await checkBlacklistedTokens(token)
    if(verifyToken) return res.status(401).send({ error: 'Token has expired' }) 
    
    req.userId = decoded.data.id;
    next();
  })
}

export async function verifyAdmin(req, res, next) {
  const token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err || decoded.data.role != 'admin') return res.status(401).send({ message: 'User not authorized', error: err?.message});
    next();
  })
}