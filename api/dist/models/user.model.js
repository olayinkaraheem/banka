"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @exports
 * @class User
 */
var User =
/**
 *Creates an instance of User.
 * @param {string} id
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} password
 * @param {string} type
 * @param {boolean} [isAdmin=false]
 * @param {string} created_at
 * @param {string} updated_at
 * @memberof User
 */
function User(id, email, firstName, lastName, password, type) {
  var isAdmin = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var created_at = arguments.length > 7 ? arguments[7] : undefined;
  var updated_at = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';

  _classCallCheck(this, User);

  this.id = id;
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.password = password;
  this.type = type;
  this.isAdmin = isAdmin;
  this.created_at = created_at;
  this.updated_at = updated_at;
};

exports["default"] = User;