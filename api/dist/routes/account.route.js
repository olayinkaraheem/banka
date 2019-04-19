"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _account = _interopRequireDefault(require("../controllers/account.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var accountController = new _account["default"]();

var router = _express["default"].Router();

router.post('/accounts', accountController.createAccount);
router.patch('/account/:accountNumber', accountController.updateAccountStatus);
router["delete"]('/account/:accountNumber', accountController.updateAccountStatus);
var _default = router;
exports["default"] = _default;