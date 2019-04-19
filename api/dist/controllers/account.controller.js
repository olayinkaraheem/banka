"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../services/accounts.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, [{
    key: "createAccount",
    value: function createAccount(req, res) {
      var accountInfo = req.body;
      var account = new _accounts["default"]();
      var newAccount = account.addAccount(accountInfo);

      if (!newAccount.error) {
        return res.status(newAccount.code).send({
          status: newAccount.code,
          data: newAccount.data
        });
      }

      return res.status(newAccount.code).send({
        status: newAccount.code,
        error: newAccount.message
      });
    }
  }, {
    key: "updateAccountStatus",
    value: function updateAccountStatus(req, res) {
      var _req$body = req.body,
          status = _req$body.status,
          userId = _req$body.userId;
      var accountNumber = req.params.accountNumber;
      var account = new _accounts["default"]();
      var updatedAccount = account.updateAccountStatus({
        status: status,
        accountNumber: accountNumber
      }, userId);

      if (!updatedAccount.error) {
        var response = req.body.status === 'deleted' ? {
          status: updatedAccount.code,
          message: updatedAccount.message
        } : {
          status: updatedAccount.code,
          data: updatedAccount.data
        };
        return res.status(updatedAccount.code).send(response);
      }

      return res.status(updatedAccount.code).send({
        status: updatedAccount.code,
        error: updatedAccount.message
      });
    }
  }]);

  return AccountController;
}();

exports["default"] = AccountController;