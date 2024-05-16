import { validateUser, getUserId, checkCredentials } from "../services/service.js";
import jwt from 'jsonwebtoken';

export class UserController{
  static async loginUser (req, res){
    const isValid = validateUser(req.body);
    console.log(`El body es: ${req.body.cardNumber}, ${req.body.password}`);

    if(!isValid.success) return res.send({message: 'The data is invalid', error: isValid.error});
      
    const {userId, cardMessage} = await getUserId(req.body.cardNumber)
    if(userId == -1 || userId == null) return res.status(400).send({ message: cardMessage });

    const {user, userMessage} = await checkCredentials(req.body.password, userId)
    if(user == -1 || user == null) return res.status(400).send({ message: userMessage}); 

    const signedData = jwt.sign({data: req.body}, process.env.JWT_SECRET)
    return res.status(200).send({ message: userMessage , data: signedData });
  }
}