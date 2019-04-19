"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = require("../.data/accounts");

var _helpers = require("../Helpers/helpers");

var _user = _interopRequireDefault(require("./user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class AccountService
 */
var AccountService =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of AccountService.
   * @memberof AccountService
   */
  function AccountService() {
    _classCallCheck(this, AccountService);

    this.accounts = _accounts.accounts;
  }
  /**
   * Get all account resources.
   * @param null
   * @returns {object}
   */


  _createClass(AccountService, [{
    key: "getAllAccounts",
    value: function getAllAccounts() {
      return this.accounts;
    }
    /**
     * Creates a new bank account.
     * @param {object} accountInfo
     * @returns {object}
     */

  }, {
    key: "addAccount",
    value: function addAccount(accountInfo) {
      var allAccounts = this.getAllAccounts();
      var newId = (0, _helpers.getLastId)(allAccounts) + 1;
      var userAccounts = allAccounts.filter(function (account) {
        return account.owner === accountInfo.owner;
      });
      var account_type_exists = (0, _helpers.recordExists)(userAccounts, accountInfo, 'type');

      if (account_type_exists) {
        return {
          message: "You already have a ".concat(accountInfo.type, " account"),
          error: true,
          code: 401
        };
      } else {
        var account_number = Math.max.apply(Math, _toConsumableArray(this.getAllAccounts().map(function (account) {
          return account.accountNumber;
        }))) + 1; // console.log('Account number',account_number);

        var userService = new _user["default"]();
        var userInfo = userService.getUserInfo(accountInfo.owner);

        if (!userInfo.error) {
          var _userInfo$data = userInfo.data,
              id = _userInfo$data.id,
              firstName = _userInfo$data.firstName,
              lastName = _userInfo$data.lastName,
              email = _userInfo$data.email;
          var newAccount = {
            id: newId,
            accountNumber: account_number,
            type: accountInfo.type,
            openingBalance: parseFloat('0.00'),
            createdOn: new Date(),
            owner: id,
            firstName: firstName,
            lastName: lastName,
            email: email
          };
          return {
            message: 'Account Created successfully',
            error: false,
            code: 201,
            data: _objectSpread({}, newAccount)
          };
        } else {
          return {
            message: 'Error Creating Account User information required',
            error: true,
            code: 403
          };
        }
      }
    }
    /**
     * Activates/Deactvate a bank account.
     * @param {number} userId
     * @param {object} update
     * @returns {object}
     */

  }, {
    key: "updateAccountStatus",
    value: function updateAccountStatus(update, userId) {
      var users = new _user["default"]();
      var allUsers = users.getAllUsers();
      var validUser = allUsers.filter(function (db_user) {
        return userId === db_user.id && db_user.isAdmin === true;
      });

      if (validUser.length) {
        var accountToUpdate = this.accounts.filter(function (account) {
          return account.accountNumber === parseInt(update.accountNumber);
        });

        if (accountToUpdate.length) {
          var allowedStatuses = ['deleted', 'dormant', 'active'];

          if (!allowedStatuses.includes(update.status)) {
            return {
              message: "Unidentified status specified",
              error: true,
              code: 400
            };
          }

          if (update.status === 'deleted') {
            accountToUpdate[0].status = 'deleted';
            return {
              message: "Account deleted successfully",
              error: false,
              code: 200
            };
          } else {
            accountToUpdate[0].status = accountToUpdate[0].status === 'active' ? 'dormant' : 'active';
            return {
              message: "Account Status successfully updated to '".concat(accountToUpdate[0].status, "'"),
              error: false,
              code: 200,
              data: _objectSpread({}, accountToUpdate[0])
            };
          }
        } else {
          return {
            message: "Account number ".concat(update.accountNumber, " does not exist"),
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

  return AccountService;
}();

exports["default"] = AccountService;