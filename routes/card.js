import express from 'express';
import { CardController } from '../controllers/card.js';
const cardRouter = express.Router();

cardRouter.post('/', CardController.createCard)

export default cardRouter;