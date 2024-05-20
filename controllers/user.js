import { validateUser, getUserId, checkCredentials, createUser, validateNewUser, validateLogoutUser, addTokenToBlacklist } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import {CreationError, ValidationError} from '../utils/utils.js';

export class UserController{
  static async loginUser (req, res){
    const isValid = validateUser(req.body);

    if(!isValid.success) return res.send({message: 'The data is invalid', error: isValid.error});
      
    const userId = await getUserId(req.body.cardNumber)
    if(userId instanceof ValidationError) return res.status(400).send({ message: userId.message });

    const user = await checkCredentials(req.body.password, userId)
    if(user instanceof ValidationError) return res.status(400).send({ message: user.message}); 

    const signedData = jwt.sign({data:{body: req.body, id: userId}}, process.env.JWT_SECRET, {expiresIn: '15m'})
    return res.status(200).send({ message: 'Login Succesful' , data: signedData });
  }

  static async createUser(req, res) {
    const isValid = validateNewUser(req.body);
    
    if(!isValid.success) return res.status(400).send({ message: isValid })

    const result = await createUser(req.body)
    if(result instanceof CreationError) return res.status(400).send({ message: result.message})

    return res.status(200).send({User: result.user, card: result.card});
  }

  static async logoutUser(req, res) {
    const token = req.headers['authorization'];
    const isValid = validateLogoutUser(req.body);
    
    if(!isValid.success) return res.status(400).send({ message: isValid})
    if(req.body.userId != req.userId) return res.status(401).send({ message: `This user is not authorized to log out the user with ${req.body.userId} ID` })

    const listedToken = await addTokenToBlacklist(token)
    if(listedToken instanceof CreationError) return res.status(400).send({ message: listedToken.message})

    return res.status(200).send({ message: 'User added to the blacklist', user: listedToken})
  }
}