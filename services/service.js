import z from 'zod';
import { Card, User } from '../models/index.js';

const userValidation = z.object({
  cardNumber: z.number().int(),
  password: z.string()
})

export function validateUser(object){
  return userValidation.safeParse(object);
}

export async function checkCredentials(cardNumber){
  //Devolver el usuario que matchea con el cardNumber
  try{
    //const card = await Card.create({ cardNumber: 123});
    //console.log(card);
    const result = await User.create({ cardNumber: 123, pin: 1123 });
    console.log(result);
  }catch(e){
    console.log("Error: " + e);
  }
  
}