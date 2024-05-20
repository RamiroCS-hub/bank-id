import { Card, Transaction } from '../models/index.js'
import { validateGetTransactions, validateTransaction} from '../services/transactionService.js'

export class TransactionController {
  static async getAllTransaction(req, res) {
    try {
      const isValid = validateGetTransactions(req.body);
      if (!isValid) return res.send({ message: 'Data is invalid', error: isValid });
      
      const card = await Card.findOne({ where: {cardNumber: req.body.cardNumber }});
      const transactions = await Transaction.findAll({ where: { cardId: card.id }});

      res.send(transactions)
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message })
    }
    
  }

  static async createTransanction(req, res) {
    try {
      const isValid = validateTransaction(req.body);
      if (!isValid) return res.send({ message: 'Data is invalid', error: isValid });

      const {cardNumberOrigin, cardNumberDestination, amount, description} = req.body;

      const cardOrigin = await Card.findOne({ where: {cardNumber: cardNumberOrigin }});
      const cardDestination = await Card.findOne({ where: {cardNumber: cardNumberDestination }});

      if(!cardOrigin || !cardDestination) {
        return res.send({ message: 'invalid card numbers. please check' });
      }

      const originAmount = cardOrigin.amount;
      const destinationAmount = cardDestination.amount;
      if(amount > originAmount) return res.status(400).send({ message: 'insufficient founds' });
      
      await Card.update({ amount: originAmount - amount}, { where:{ id: cardOrigin.id }});
      await Card.update({ amount: destinationAmount + amount}, { where:{ id: cardDestination.id }});
      
      const transaction = await Transaction.create({
        cardId: cardOrigin.id,
        amount,
        description,
        cardNumberOrigin,
        cardNumberDestination
      })

      res.send(transaction)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }
}
