"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactions = void 0;
var transactions = [{
  id: 1,
  createdOn: '2019-04-13 01:21:00',
  type: 'credit',
  // credit or debit
  accountNumber: 1233445642,
  cashier: 2,
  // cashier who consummated the transaction
  amount: '3000.00',
  oldBalance: 43500.65,
  newBalance: 40500.65
}];
exports.transactions = transactions;