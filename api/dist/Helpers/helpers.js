"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.getLastId = exports.recordExists = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Checks if a record already exists
 * @param {object} model
 * @param {object} data
 * @param {string} key
 * @returns {boolean}
 */
var recordExists = function recordExists(model, data, key) {
  var check = model.filter(function (resource) {
    return resource[key] === data[key];
  });
  return check.length ? true : false;
};
/**
 * Gets the last ID from a list of resources
 * @param {object} model
 * @returns {number}
 */


exports.recordExists = recordExists;

var getLastId = function getLastId(model) {
  var ids = model.map(function (item) {
    return item.id;
  });
  return Math.max.apply(Math, _toConsumableArray(ids));
};
/**
 * Generates random token
 * @param null
 * @returns {string} token
 */


exports.getLastId = getLastId;

var generateToken = function generateToken() {
  var token = '45erkjherht45495783';
  return token;
};

exports.generateToken = generateToken;