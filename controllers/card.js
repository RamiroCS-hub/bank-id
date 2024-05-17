import { createCard, validateData } from '../services/cardService.js';
import { CreationError } from '../utils/utils.js';

export class CardController {
  static async createCard(req, res){
    const result = validateData(req.body)
    if(!result) res.status(400).send(result)

    const cardData = await createCard(req.body)
    if(cardData instanceof CreationError) return res.status(400).send(cardData)
    
    return res.status(200).send({ message: 'Card created successfully'})
  }
}