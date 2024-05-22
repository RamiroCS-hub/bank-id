import { Blacklist } from "../models/index.js";

export class ValidationError extends Error {
  constructor(message){
    super(message);
  }
}

export class CreationError extends Error {
  constructor(message){
    super(message);
  }
}

export class TransactionError extends Error {
  constructor(message){
    super(message);
  }
}

export async function checkBlacklistedTokens(token){
  try {
    const user = await Blacklist.findAll({ where: { token: token } });
    if(user == null) return false;
    console.log(user)
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}