import { ValidationError } from '../utils/utils.js';
import { 
  validateGetTransactions, 
  validateTransaction, 
  createTransaction, 
  getAllTransaction } from '../services/transactionService.js'

export class TransactionController {

  static async getAllTransaction(req, res) {
    // Esta es la validacion que no logro sacar
    // Aca solo valido el numero de tarjeta y que sea de tipo number
    // si es un string, que arroje el error debidamente
    const isValid = validateGetTransactions(req.body);
    if (isValid) return res.send({ message: 'Data is invalid', error: isValid });
      
    const transactions = await getAllTransaction(req.body);
    if(transactions instanceof ValidationError) return res.status(400).send({ message: transactions.message})

    res.send(transactions)
  }


  static async createTransanction(req, res) {
    // En este todas las validaciones funcionan correctamente
    const isValid = validateTransaction(req.body);     
    if(!isValid.success) {
      const message = isValid.error.issues.map((e) => e)
      return res.send({ message: 'Data is invalid', error: message });
    }
    const transaction = await createTransaction(req.body);
    if(transaction instanceof ValidationError) return res.status(400).send({ message: transaction.message})
    res.send(transaction);
  }
}
