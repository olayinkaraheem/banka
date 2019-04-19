"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = require("../.data/users");

var _helpers = require("../Helpers/helpers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class UserService
 */
var UserService =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of UserService.
   * @memberof User
   */
  function UserService() {
    _classCallCheck(this, UserService);

    this.users = _users.users;
  }
  /**
   * Get all user resources.
   * @param null
   * @returns {object}
   */


  _createClass(UserService, [{
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.users;
    }
    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */

  }, {
    key: "addUser",
    value: function addUser(user) {
      // const new_user = new User({ ...user });
      var allUsers = this.getAllUsers();
      var newId = (0, _helpers.getLastId)(allUsers) + 1;
      var email_exists = (0, _helpers.recordExists)(allUsers, user, 'email');
      var token = (0, _helpers.generateToken)();

      if (email_exists) {
        return {
          message: 'Email already exist',
          error: true,
          code: 401
        };
      } else {
        return {
          message: 'Signup successful',
          error: false,
          code: 201,
          data: _objectSpread({
            token: token,
            id: newId
          }, user)
        };
      }
    }
    /**
     * Logs in a user.
     * @param {object} user
     * @returns {object}
     */

  }, {
    key: "loginUser",
    value: function loginUser(user) {
      var allUsers = this.getAllUsers();
      var email_exists = (0, _helpers.recordExists)(allUsers, user, 'email'); // const token = generateToken();

      if (!email_exists) {
        return {
          message: 'Users With This Email Does Not exist',
          error: true,
          code: 404
        };
      } else {
        var validUser = allUsers.filter(function (db_user) {
          return user.password === db_user.password && user.email === db_user.email;
        });

        if (validUser.length) {
          return {
            message: 'Login successful',
            error: false,
            code: 200,
            data: _objectSpread({}, validUser[0])
          };
        } else {
          return {
            message: 'Login Failed. Please enter a valid password',
            error: true,
            code: 401
          };
        }
      }
    }
    /**
     * Gets user information.
     * @param {number} userId
     * @returns {object}
     */

  }, {
    key: "getUserInfo",
    value: function getUserInfo(userId) {
      var userInfo = this.getAllUsers().filter(function (user) {
        return user.id === userId;
      });

      if (!userInfo.length) {
        return {
          message: 'User information not found',
          error: true,
          code: 404
        };
      } else {
        return {
          message: 'User Information Found',
          error: false,
          code: 200,
          data: _objectSpread({}, userInfo[0])
        };
      }
    }
  }]);

  return UserService;
}();

exports["default"] = UserService;