import { validateUser, getUserId, checkCredentials, createUser } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import {ValidationError} from '../utils/utils.js';

export class UserController{
  static async loginUser (req, res){
    const isValid = validateUser(req.body);

    if(!isValid.success) return res.send({message: 'The data is invalid', error: isValid.error});
      
    const userId = await getUserId(req.body.cardNumber)
    if(userId instanceof ValidationError) return res.status(400).send({ message: userId.message });

    const user = await checkCredentials(req.body.password, userId)
    if(user instanceof ValidationError) return res.status(400).send({ message: user.message}); 

    const signedData = jwt.sign({data: req.body}, process.env.JWT_SECRET, {expiresIn: '15m'})
    return res.status(200).send({ message: 'Login Succesful' , data: signedData });
  }

  static async createUser(req, res) {
    const result = await createUser()
    return res.send(result);
  }
}