import z from 'zod';

const userValidation = z.object({
  cardNumber: z.number().int(),
  password: z.string()
})

export function validateUser(object){
  return userValidation.safeParse(object);
}

export async function checkCredentials(cardNumber){
  //Devolver el usuario que matchea con el cardNumber
}