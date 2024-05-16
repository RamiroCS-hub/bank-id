import z from 'zod';
import { Card, User } from '../models/index.js';

const userValidation = z.object({
  cardNumber: z.number().int(),
  password: z.number().int()
})

export function validateUser(object){
  return userValidation.safeParse(object);
}

export async function getUserId(cardNumber){
  //Devolver el usuario que matchea con el cardNumber
  try{
    /*const result = await User.create({ firstname: 'Pepe', lastname: 'Perez', email:'pepe@gmail.com', pin: 1123 });
    console.log('El result fue', result);
    const card = await Card.create({ cardNumber: 123456, isAuth: true, userId: 1});
    console.log(card);*/
    const { userId, isAuth } = await Card.findOne({ where: {cardNumber: cardNumber } });
    if(!isAuth) return {userId: null, cardMessage:'Card not found'};
    return {userId: userId, cardMessage: ''};
  }catch(e){
    console.log("Error: " + e);
    return {userId: null, cardMessage: e.message};
  }
}

export async function checkCredentials(password, userId) {
  try {
    const { pin } = await User.findOne({ where: { id: userId } });

    if(pin != password) return {user: null, userMessage:'Password incorrect'};
    return {user: pin, userMessage: 'Login successful'};
  } catch (e) {
    console.log("Error: " + e);
    return {user: null, userMessage:'Password incorrect'};
  }
}