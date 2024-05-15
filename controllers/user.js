import { validateUser, checkCredentials } from "../services/service.js";

export class UserController{
  static async loginUser (req, res){
    const isValid = validateUser(req.body);

    if(!isValid.success) return res.send({message: 'The data is invalid', error: isValid.error});
    
    const user = await getUserByCardNumber(req.body.cardNumber);
  }
}