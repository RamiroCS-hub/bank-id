import { ValidationError } from '../utils/utils.js';
import { 
  validateGetTransactions, 
  validateTransaction, 
  createTransaction, 
  getAllTransaction } from '../services/transactionService.js'

export class TransactionController {

  static async getAllTransaction(req, res) {
    const isValid = validateGetTransactions(req.body);
    if (!isValid.success) return res.send({ message: 'Data is invalid', error: isValid });
      
    const transactions = await getAllTransaction(req.body);
    if(transactions instanceof ValidationError) return res.status(400).send({ message: transactions.message})

    return res.send(transactions)
  }


  static async createTransanction(req, res) {
    // En este todas las validaciones funcionan correctamente
    const isValid = validateTransaction(req.body);
    console.log(isValid);     
    if(!isValid.success) {
      const message = isValid.error.issues.map((e) => e)
      return res.send({ message: 'Data is invalid', error: message });
    }
    const transaction = await createTransaction(req.body);
    if(transaction instanceof ValidationError) return res.status(400).send({ message: transaction.message})
    return res.send(transaction);
  }
}
