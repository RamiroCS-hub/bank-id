import { ValidationError } from '../utils/utils.js';
import { 
  validateGetTransactions, 
  validateTransaction, 
  createTransaction, 
  getAllTransaction } from '../services/transactionService.js'
import { useRedis } from '../utils/redis.js';

export class TransactionController {

  static async getAllTransaction(req, res) {
    const isValid = validateGetTransactions(req.body);
    if (!isValid.success) return res.send({ message: 'Data is invalid', error: isValid });
    
    useRedis(`transactions:${req.body.cardNumber}`, async () => {
      const transactions = await getAllTransaction(req.body);
      return transactions;
    }).then( data => {
      console.log('No ocurrió un error')
      return res.status(200).send({ data: data });
    }).catch( err => {
      console.log('ocurrió un error')
      return res.status(400).send({ error: err });
    })
  }


  static async createTransanction(req, res) {
    // En este todas las validaciones funcionan correctamente
    const isValid = validateTransaction(req.body);  
    if(!isValid.success) {
      const message = isValid.error.issues.map((e) => ({ path: e.path[0], message: e.message }));
      return res.send({ message: 'Data is invalid', error: message });
    }
    const transaction = await createTransaction(req.body);
    if(transaction instanceof ValidationError) return res.status(400).send({ message: transaction.message})
    return res.send(transaction);
  }
}
