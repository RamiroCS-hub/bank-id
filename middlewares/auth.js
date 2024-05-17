import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).send({ message: 'User not authorized', error: err.message})
    req.userId = decoded.data.id
    console.log(decoded.data.id);
    next();
  })
}

export async function verifyAdmin(req, res, next) {
  const token = req.headers['authorization'];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err || decoded.data.role != 'admin') return res.status(401).send({ message: 'User not authorized', error: err?.message})
    next();
  })
}