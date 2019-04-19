"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../controllers/transactions.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionController = new _transactions["default"]();

var router = _express["default"].Router();

router.post('/:accountNumber/debit', transactionController.performTransaction);
router.post('/:accountNumber/credit', transactionController.performTransaction);
var _default = router;
exports["default"] = _default;