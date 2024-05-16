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
    /*const result = await User.create({ firstname: 'Pepe', lastname: 'Perez', email:'pepe@gmail.com', pin: 1123 });
    console.log('El result fue', result);
    const card = await Card.create({ cardNumber: 123456, isAuth: true, userId: 1});
    console.log(card);*/
    const result = await User.findOne({ })

  }catch(e){
    console.log("Error: " + e);
  }
  
}