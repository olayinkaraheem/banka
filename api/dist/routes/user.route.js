"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userController = new _users["default"]();

var router = _express["default"].Router();

router.post('/signup', userController.signupUser);
router.post('/signin', userController.loginUser);
var _default = router;
exports["default"] = _default;