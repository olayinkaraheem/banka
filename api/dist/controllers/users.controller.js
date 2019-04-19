"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../services/user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "signupUser",
    value: function signupUser(req, res) {
      var user_data = req.body;
      var user = new _user["default"]();
      var new_user = user.addUser(user_data);

      if (!new_user.error) {
        return res.status(new_user.code).send({
          status: 201,
          data: new_user.data
        });
      }

      return res.status(new_user.code).send({
        status: 401,
        error: new_user.message
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var user_data = req.body;
      var user = new _user["default"]();
      var existing_user = user.loginUser(user_data);

      if (!existing_user.error) {
        return res.status(existing_user.code).send({
          status: existing_user.code,
          data: existing_user.data
        });
      }

      return res.status(existing_user.code).send({
        status: existing_user.code,
        error: existing_user.message
      });
    }
  }]);

  return UsersController;
}();

exports["default"] = UsersController;