import express from 'express';
const transactionRouter = express.Router();
import { TransactionController } from '../controllers/transaction.js'

transactionRouter.get('/', TransactionController.getAllTransaction);

transactionRouter.post('/', TransactionController.createTransanction);

export default transactionRouter;