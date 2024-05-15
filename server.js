import dotenv from 'dotenv'
import express, { json } from 'express';
const app = express();
import cors from 'cors';
import router from './routes/user.js';
//import { sequelize } from './config/database.js';

dotenv.config();
app.use(json());
app.use(cors({ origin: true, credentials:true }));

app.use('/user', router)

app.use("/", (req, res) => {
    res.json({
        message: 'Welcome to the API',
        status: 200,
    })
});

/*
sequelize.sync().then(() => {
    console.log('Database synced succesfully');
})*/

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

