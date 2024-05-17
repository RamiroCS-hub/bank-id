import express from 'express';
import { UserController } from '../controllers/user.js';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('This is the user get router');
})

userRouter.post('/login', UserController.loginUser)
userRouter.get('/testUser', UserController.createUser)

export default userRouter;