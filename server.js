import dotenv from 'dotenv'
import express, { json } from 'express';
const app = express();
import cors from 'cors';
import {userRouter, cardRouter, transactionRouter } from './routes/index.js';
import { sequelize } from './config/database.js';
import { verifyToken } from './middlewares/auth.js';
//import { redisClient } from './utils/redis.js';

dotenv.config();
app.use(json());
app.use(cors({ origin: true, credentials: true }));

app.use('/user', userRouter);
app.use('/card', verifyToken ,cardRouter);
app.use('/transactions', transactionRouter);

app.use('/', (req, res) => {
    res.status(404).json({
        message: 'Page does not exist',
    })
});


sequelize.sync().then(() => {
    console.log('Database synced succesfully');
})

//redisClient()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

