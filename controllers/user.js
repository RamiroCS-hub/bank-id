import { validateUser, getUserId, checkCredentials } from "../services/service.js";

export class UserController{
  static async loginUser (req, res){
    try {
      const isValid = validateUser(req.body);
      console.log(`El body es: ${req.body.cardNumber}, ${req.body.password}`);

      if(!isValid.success) return res.send({message: 'The data is invalid', error: isValid.error});
      
      const userId = await getUserId(req.body.cardNumber)
      if(userId == -1) return res.status(400).send({ message: 'Invalid card number'});

      const user = await checkCredentials(req.body.password, userId)
      if(user == -1) return res.status(400).send({ message: 'Incorrect Password'}); 
      
      return res.status(200).send({ message: 'You login successfully'});
    } catch (err) {
      return res.status(400).send({ error: err.message});
    }
  }
}