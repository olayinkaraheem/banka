import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index';

const expect = chai.expect;
// const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);
describe('Transactions', () => {
  describe('/POST Perform Transaction', () => {
    it('It should debit a bank account', done => {
      const transaction_detail = {
        amount: parseFloat('3000.00'),
        cashier: 2,
        type: 'debit'
      };

      chai
        .request(app)
        .post('/api/v1/transactions/1233445643/debit')
        .send(transaction_detail)
        .end((err, res) => {
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

    it('It should credit a bank account', done => {
      const transaction_detail = {
        amount: parseFloat('3000.00'),
        cashier: 2,
        type: 'credit'
      };

      chai
        .request(app)
        .post('/api/v1/transactions/1233445643/credit')
        .send(transaction_detail)
        .end((err, res) => {
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
