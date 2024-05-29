import express from 'express';
import { UserController } from '../controllers/user.js';
import { verifyAdmin, verifyToken } from '../middlewares/auth.js';
const userRouter = express.Router();

userRouter.post('/login', UserController.loginUser)
userRouter.post('/testUser', verifyAdmin, UserController.createUser)
userRouter.post('/logout', verifyToken, UserController.logoutUser)

export default userRouter;