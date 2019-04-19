"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect; // const assert = chai.assert;

var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Transactions', function () {
  describe('/POST Perform Transaction', function () {
    it('It should debit a bank account', function (done) {
      var transaction_detail = {
        amount: parseFloat('3000.00'),
        cashier: 2,
        type: 'debit'
      };

      _chai["default"].request(_index.app).post('/api/v1/transactions/1233445643/debit').send(transaction_detail).end(function (err, res) {
        expect(transaction_detail).to.have.property('type');
        expect(transaction_detail).to.have.property('cashier');
        expect(transaction_detail).to.have.property('amount');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('accountBalance');
        done();
      });
    });
    it('It should credit a bank account', function (done) {
      var transaction_detail = {
        amount: parseFloat('3000.00'),
        cashier: 2,
        type: 'credit'
      };

      _chai["default"].request(_index.app).post('/api/v1/transactions/1233445643/credit').send(transaction_detail).end(function (err, res) {
        expect(transaction_detail).to.have.property('type');
        expect(transaction_detail).to.have.property('cashier');
        expect(transaction_detail).to.have.property('amount');
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('accountBalance');
        done();
      });
    });
  });
});