import dotenv from 'dotenv'
import express, { json } from 'express';
const app = express();
import cors from 'cors';
const PORT = process.env.PORT || 3001;
import { sequelize } from './config/database';

dotenv.config();
app.use(json());
app.use(cors({ origin: true, credentials:true }));

app.use("/", (req, res) => {
    res.json({
        message: 'Welcome to the API',
        status: 200,
    })
});

sequelize.sync().then(() => {
    console.log('Database synced succesfully');
})

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

