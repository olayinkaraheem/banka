import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index';

const expect = chai.expect;
// const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);
describe('Accounts', () => {
  describe('/POST Account Create', () => {
    it('It should create a new bank account', done => {
      const new_account = {
        owner: 3, // user id
        type: 'current' // savings, current
      };
      chai
        .request(app)
        .post('/api/v1/accounts')
        .send(new_account)
        .end((err, res) => {
          expect(new_account).to.have.property('type');
          expect(new_account).to.have.property('owner');
          res.should.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('accountNumber');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('openingBalance');
          done();
        });
    });
  });
});
