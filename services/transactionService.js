import z from "zod";
import { Card, Transaction } from '../models/index.js';
import { TransactionError, ValidationError } from '../utils/utils.js';

const transactionValidation = z.object({
  cardNumberOrigin: z.number().int(),
  cardNumberDestination: z.number().int(),
  amount: z.number().int(),
  description: z.string(),
});

const cardNumberValidation = z.object({
  cardNumber: z.number().int(),
})

export function validateTransaction(object) {
  return transactionValidation.parse(object);
}

export async function validateGetTransactions(object) {
  return cardNumberValidation.parse(object)
}

export async function getAllTransaction(data) {
  try {
    const { cardNumber } = data;
    const card = await Card.findOne({where: { cardNumber: cardNumber }})

    if (!card) throw new TransactionError("Card not found");

    const transactions = await Transaction.findAll({where: { cardId: card.id }})
    return transactions
  } catch (error) {
    return new ValidationError(error.message);
  }
}


export async function createTransaction(data) {
  try {
    const { cardNumberOrigin, cardNumberDestination, amount, description } = data;

    const cardOrigin = await Card.findOne({ where: { cardNumber: cardNumberOrigin } });
    const cardDestination = await Card.findOne({ where: { cardNumber: cardNumberDestination } });

    if (!cardOrigin || !cardDestination) {
      return new ValidationError('Invalid card numbers. Please check.');
    }

    const originAmount = cardOrigin.amount;
    const destinationAmount = cardDestination.amount;
    
    if (amount > originAmount) {
      return new ValidationError('Insufficient funds. Please check your balance account.');
    }

    await Card.update({ amount: originAmount - amount }, { where: { id: cardOrigin.id } });
    await Card.update({ amount: destinationAmount + amount }, { where: { id: cardDestination.id } });

    const transaction = await Transaction.create({
      cardId: cardOrigin.id,
      amount,
      description,
      cardNumberOrigin,
      cardNumberDestination
    });

    return transaction;
  } catch (error) {
    return new ValidationError(error.message);
  }
}


