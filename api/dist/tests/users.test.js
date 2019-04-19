"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect; // const assert = chai.assert;

var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Users', function () {
  describe('/POST User Register', function () {
    it('It should sign up a new user', function (done) {
      var new_user = {
        firstname: 'first_' + Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, ''),
        lastname: 'last_' + Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, ''),
        password: 'anothertestpass2',
        email: Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '') + '@mail.com',
        type: 3,
        isAdmin: false,
        updated_at: new Date(),
        updated_by: 0,
        created_at: new Date()
      };

      _chai["default"].request(_index.app).post('/api/v1/auth/signup').send(new_user).end(function (err, res) {
        expect(new_user).to.have.property('firstname');
        expect(new_user).to.have.property('lastname');
        expect(new_user).to.have.property('password');
        expect(new_user).to.have.property('email');
        expect(new_user).to.have.property('type');
        new_user.type.should.equal(3);
        res.should.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });
  describe('/POST Login A User', function () {
    it('It should log a user in', function (done) {
      var user = {
        email: 'admin@banka.com',
        password: 'adminpass@421'
      };

      _chai["default"].request(_index.app).post('/api/v1/auth/signin').send(user).end(function (err, res) {
        expect(user).to.have.property('email');
        expect(user).to.have.property('password');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });
});