import z from 'zod';
import { Card, User } from '../models/index.js';
import {ValidationError} from '../utils/utils.js';
import bcrypt from 'bcrypt';

const userValidation = z.object({
  cardNumber: z.number().int(),
  password: z.string()
})

const newUserValidation = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  pin: z.string(),
  role: z.string(),
  cardNumber: z.number().int(),
})

export function validateUser(object){
  return userValidation.safeParse(object);
}

export function validateNewUser(object){
  return newUserValidation.safeParse(object);
}

export async function createUser(data){
  const hashedPass = bcrypt.hashSync(data.pin, 10);
  const result = await User.create({ firstname: data.firstname, lastname: data.lastname, email: data.email, pin: hashedPass });
  const card = await Card.create({cardNumber: 123123123, userId: result.id, isAuth: true});
  return { result, card };
}

export async function getUserId(cardNumber){
  //Devolver el usuario que matchea con el cardNumber
  try{
    const { userId, isAuth } = await Card.findOne({ where: {cardNumber: cardNumber } });
    if(!isAuth) return new ValidationError('Card not found');
    return userId;
  }catch(e){
    console.log("Error: " + e);
    return new ValidationError(e);
  }
}

export async function checkCredentials(password, userId) {
  try {
    const { pin } = await User.findOne({ where: { id: userId } });

    const isAuth = await bcrypt.compare(password, pin)
    if(!isAuth) return new ValidationError('Password incorrect');
    return '';
  } catch (e) {
    console.log("Error: " + e);
    return new ValidationError(e);
  }
}