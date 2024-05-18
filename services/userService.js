import z from 'zod';
import { Card, User, Blacklist } from '../models/index.js';
import {CreationError, ValidationError} from '../utils/utils.js';
import bcrypt from 'bcrypt';

const userValidation = z.object({
  cardNumber: z.number().int(),
  password: z.string()
})

export function validateUser(object){
  return userValidation.safeParse(object);
}

const newUserValidation = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  pin: z.string(),
  role: z.string(),
  cardNumber: z.number().int(),
})

export function validateNewUser(object){
  return newUserValidation.safeParse(object);
}

const logoutUser = z.object({
  userId: z.number().int(),
})

export function validateLogoutUser(object) {
  return logoutUser.safeParse(object)
}

export async function createUser(data){
  try {
    const hashedPass = bcrypt.hashSync(data.pin, 10);
    const user = await User.create({ firstname: data.firstname, lastname: data.lastname, email: data.email, pin: hashedPass });
    const card = await Card.create({cardNumber: data.cardNumber, userId: user.id, isAuth: true});
    const object = {
      user: user,
      card: card
    }
    return object;
  } catch (e) {
    return new CreationError('Creation error Ocurred');
  }
  
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

export async function addTokenToBlacklist(token) {
  try {
    const user = await Blacklist.create({ token: token });  
    return user;
  } catch (e) {
    console.log(e);
    return new CreationError('Error creating user to the blacklist');
  }
}