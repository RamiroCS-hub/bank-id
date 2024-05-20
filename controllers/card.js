import { createCard, validateData } from '../services/cardService.js';
import { CreationError } from '../utils/utils.js';

export class CardController {
  static async createCard(req, res){
    const isValid = validateData(req.body)
    if(!isValid.success) return res.status(400).send(isValid)
    
    if(req.body.userId != req.userId) return res.status(401).send('Not authorized to create a card with that userId')

    const cardData = await createCard(req.body)
    if(cardData instanceof CreationError) return res.status(400).send(cardData)
    
    return res.status(200).send({ message: 'Card created successfully'})
  }
}