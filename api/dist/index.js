"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _account = _interopRequireDefault(require("./routes/account.route"));

var _transactions = _interopRequireDefault(require("./routes/transactions.route"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
exports.app = app;
app.use(_bodyParser["default"].json());
app.use('/api/v1/auth', _user["default"]);
app.use('/api/v1/', _account["default"]);
app.use('/api/v1/transactions', _transactions["default"]);
app.get('/', function (req, res) {
  res.send('Welcome');
});
var PORT = 8080;
var server = app.listen(process.env.PORT || PORT, function () {
  console.log("server started on port ".concat(PORT));
});