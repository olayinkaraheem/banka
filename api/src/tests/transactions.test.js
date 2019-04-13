import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index';

const expect = chai.expect;
// const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);
describe('Transactions', () => {
  describe('/POST Perform Transaction', () => {
    it('It should debit bank account', done => {
      const transaction_detail = {
        amount: parseFloat('3000.00'),
        cashier: 2,
        type: 'debit'
      };

      chai
        .request(app)
        .post('/api/v1/transaction/1233445642/debit')
        .send(transaction_detail)
        .end((err, res) => {
          expect(transaction_detail).to.have.property('type');
          expect(transaction_detail).to.have.property('cashier');
          expect(transaction_detail).to.have.property('amount');
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.have.property('transactionId');
          expect(res.body.data).to.have.property('type');
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
