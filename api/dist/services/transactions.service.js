"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = require("../.data/transactions");

var _helpers = require("../Helpers/helpers");

var _user = _interopRequireDefault(require("./user.service"));

var _accounts = _interopRequireDefault(require("./accounts.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class TransactionService
 */
var TransactionService =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of TransactionService.
   * @memberof TransactionService
   */
  function TransactionService() {
    _classCallCheck(this, TransactionService);

    this.transactions = _transactions.transactions;
  }
  /**
   * Get all transaction resources.
   * @param null
   * @returns {object}
   */


  _createClass(TransactionService, [{
    key: "getAllTransactions",
    value: function getAllTransactions() {
      return this.transactions;
    }
    /**
     * Performs a debit or credit account on a bank account.
     * @param {number} userId
     * @param {object} transactionInfo
     * @returns {object}
     */

  }, {
    key: "performTransaction",
    value: function performTransaction(transactionInfo, userId) {
      var users = new _user["default"]();
      var allUsers = users.getAllUsers();
      var validCashier = allUsers.filter(function (db_user) {
        return userId === db_user.id && db_user.type === 'staff' && db_user.isAdmin === false;
      });

      if (validCashier.length) {
        var accountService = new _accounts["default"]();
        var account = accountService.getAllAccounts().filter(function (account) {
          return account.accountNumber === parseInt(transactionInfo.accountNumber);
        });

        if (account.length) {
          var accountBalance = account[0].balance;
          var transactionAmount = transactionInfo.amount;
          var debitable = accountBalance - transactionAmount >= 0 ? true : false;

          if (account[0].status === 'dormant' || account[0].status === 'deleted') {
            return {
              message: "".concat(transactionInfo.type, " not allowed. Account is ").concat(account.status, ", kindly contact admin."),
              error: true,
              code: 403
            };
          } else {
            var transactionId = (0, _helpers.getLastId)(this.getAllTransactions()) + 1;
            var oldAccountBalance = accountBalance;
            var newAccountBalance = accountBalance;

            if (debitable && transactionInfo.type.toLowerCase() === 'debit') {
              newAccountBalance = accountBalance - transactionAmount;
            } else if (transactionInfo.type.toLowerCase() === 'credit') {
              newAccountBalance = accountBalance + transactionAmount;
            } else {
              return {
                message: 'Insufficient balance.',
                error: true,
                code: 403
              };
            }

            var newTransactionDetail = {
              id: transactionId,
              createdOn: new Date(),
              type: transactionInfo.type.toLowerCase(),
              accountNumber: account.accountNumber,
              cashier: userId,
              // cashier who consummated the transaction
              amount: parseFloat("".concat(transactionInfo.amount, ".00")),
              oldBalance: parseFloat("".concat(oldAccountBalance, ".00")),
              newBalance: parseFloat("".concat(newAccountBalance, ".00"))
            };
            this.getAllTransactions().push(newTransactionDetail);
            var dataToReturn = {
              transactionId: transactionId,
              accountNumber: transactionInfo.accountNumber,
              amount: parseFloat("".concat(transactionInfo.amount, ".00")),
              cashier: userId,
              transactionType: transactionInfo.type,
              accountBalance: parseFloat("".concat(newAccountBalance, ".00"))
            };
            return {
              message: "".concat(transactionInfo.type, " action successfull on '").concat(account[0].accountNumber, "'"),
              error: false,
              code: 200,
              data: dataToReturn
            };
          }
        } else {
          return {
            message: "Account number ".concat(transactionInfo.accountNumber, " does not exist"),
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
  }]);

  return TransactionService;
}();

exports["default"] = TransactionService;