import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index';

const expect = chai.expect;
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

  describe('/PATCH Account Activate Deactivate', () => {
    it('It should set a bank account to dormant status', done => {
      const account_status = {
        status: 'dormant',
        userId: 1
      };
      chai
        .request(app)
        .patch('/api/v1/account/1233445642')
        .send(account_status)
        .end((err, res) => {
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

    it('It should set a bank account to active status', done => {
      const account_status = {
        status: 'active',
        userId: 1
      };
      chai
        .request(app)
        .patch('/api/v1/account/1233445642')
        .send(account_status)
        .end((err, res) => {
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

    it('It should set a bank account to deleted status', done => {
      const account_status = {
        status: 'deleted',
        userId: 1
      };
      chai
        .request(app)
        .delete('/api/v1/account/1233445642')
        .send(account_status)
        .end((err, res) => {
          expect(account_status).to.have.property('status');
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
