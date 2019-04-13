import { transactions } from '../.data/transactions';
import { recordExists, getLastId } from '../Helpers/helpers';
import UserService from './user.service';
import AccountService from './accounts.service';

/**
 * @exports
 * @class TransactionService
 */

export default class TransactionService {
  /**
   * Creates an instance of TransactionService.
   * @memberof TransactionService
   */
  constructor() {
    this.transactions = transactions;
  }

  /**
   * Get all transaction resources.
   * @param null
   * @returns {object}
   */
  getAllTransactions() {
    return this.transactions;
  }

  /**
   * Performs a debit or credit account on a bank account.
   * @param {number} userId
   * @param {object} transactionInfo
   * @returns {object}
   */
  performTransaction(transactionInfo, userId) {
    const users = new UserService();
    const allUsers = users.getAllUsers();
    const validCashier = allUsers.filter(db_user => {
      return userId === db_user.id && db_user.type === 'staff' && db_user.isAdmin === false;
    });
    if (validCashier.length) {
      const accountService = new AccountService();
      const account = accountService.getAllAccounts().filter(account => {
        return account.accountNumber === parseInt(transactionInfo.accountNumber);
      });
      if (account.length) {
        const accountBalance = account[0].balance;
        const transactionAmount = transactionInfo.amount;
        console.log(accountBalance, transactionAmount);
        const debitable = accountBalance - transactionAmount >= 0 ? true : false;

        if (account[0].status === 'dormant' || account[0].status === 'deleted') {
          return {
            message: `${transactionInfo.type} not allowed. Account is ${
              account.status
            }, kindly contact admin.`,
            error: true,
            code: 403
          };
        } else {
          const transactionId = getLastId(this.getAllTransactions()) + 1;
          const oldAccountBalance = accountBalance;
          let newAccountBalance = accountBalance;
          console.log(debitable, transactionInfo.type.toLowerCase());
          if (debitable && transactionInfo.type.toLowerCase() === 'debit') {
            newAccountBalance = accountBalance - transactionAmount;
          } else {
            return {
              message: 'Insufficient balance.',
              error: true,
              code: 403
            };
          }
          const newTransactionDetail = {
            id: transactionId,
            createdOn: new Date(),
            type: transactionInfo.type.toLowerCase(),
            accountNumber: account.accountNumber,
            cashier: userId, // cashier who consummated the transaction
            amount: parseFloat(`${transactionInfo.amount}.00`),
            oldBalance: parseFloat(`${oldAccountBalance}.00`),
            newBalance: parseFloat(`${newAccountBalance}.00`)
          };
          this.getAllTransactions().push(newTransactionDetail);
          const dataToReturn = {
            transactionId,
            accountNumber: transactionInfo.accountNumber,
            amount: parseFloat(`${transactionInfo.amount}.00`),
            cashier: userId,
            transactionType: transactionInfo.type,
            accountBalance: parseFloat(`${newAccountBalance}.00`)
          };
          return {
            message: `${transactionInfo.type} action successfull on '${account[0].accountNumber}'`,
            error: false,
            code: 200,
            data: dataToReturn
          };
        }
      } else {
        return {
          message: `Account number ${transactionInfo.accountNumber} does not exist`,
          error: true,
          code: 404
        };
      }
    } else {
      return {
        message: 'You are not authorized to perform this action.',
        error: true,
        code: 403
      };
    }
  }
}
