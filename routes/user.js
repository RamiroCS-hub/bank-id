import express from 'express';
import { UserController } from '../controllers/user.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the user get router');
})

router.post('/login', UserController)

export default router;