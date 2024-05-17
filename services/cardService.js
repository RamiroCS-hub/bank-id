import z from 'zod';
import { Card } from '../models/index.js';
import { CreationError } from '../utils/utils.js';

const cardValidation = z.object({
  cardNumber: z.number().int(),
  userId: z.number().int(),
})

export function validateData(data){
  return cardValidation.safeParse(data);
}

export async function createCard(data){
  try {
    const result = await Card.create({ cardNumber: data.cardNumber, userId: data.userId });
    return result;
  } catch (e) {
    return CreationError('Error creating card');
  }
}