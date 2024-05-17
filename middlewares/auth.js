import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).send({ message: 'User not authorized'})
    next();
  })
}