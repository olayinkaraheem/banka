import Transaction from '../services/transactions.service';

export default class AccountController {
  performTransaction(req, res) {
    const transactionInfo = req.body;
    const accountNumber = req.params.accountNumber;
    const transaction = new Transaction();
    const newTransaction = transaction.performTransaction(
      { ...transactionInfo, accountNumber },
      transactionInfo.cashier
    );

    if (!newTransaction.error) {
      return res
        .status(newTransaction.code)
        .send({ status: newTransaction.code, data: newTransaction.data });
    }
    return res
      .status(newTransaction.code)
      .send({ status: newTransaction.code, error: newTransaction.message });
  }
}
