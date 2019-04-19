"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect; // const assert = chai.assert;

var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Accounts', function () {
  describe('/POST Account Create', function () {
    it('It should create a new bank account', function (done) {
      var new_account = {
        owner: 3,
        // user id
        type: 'current' // savings, current

      };

      _chai["default"].request(_index.app).post('/api/v1/accounts').send(new_account).end(function (err, res) {
        expect(new_account).to.have.property('type');
        expect(new_account).to.have.property('owner');
        res.should.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('openingBalance');
        done();
      });
    });
  });
  describe('/PATCH Account Activate Deactivate', function () {
    it('It should set a bank account to dormant status', function (done) {
      var account_status = {
        status: 'dormant',
        userId: 1
      };

      _chai["default"].request(_index.app).patch('/api/v1/account/1233445642').send(account_status).end(function (err, res) {
        expect(account_status).to.have.property('status');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data.status).to.equal('dormant');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('accountNumber');
        done();
      });
    });
    it('It should set a bank account to active status', function (done) {
      var account_status = {
        status: 'active',
        userId: 1
      };

      _chai["default"].request(_index.app).patch('/api/v1/account/1233445642').send(account_status).end(function (err, res) {
        expect(account_status).to.have.property('status');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data.status).to.equal('active');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('accountNumber');
        done();
      });
    });
    it('It should set a bank account to deleted status', function (done) {
      var account_status = {
        status: 'deleted',
        userId: 1
      };

      _chai["default"].request(_index.app)["delete"]('/api/v1/account/1233445642').send(account_status).end(function (err, res) {
        expect(account_status).to.have.property('status');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
    });
  });
});