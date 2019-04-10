import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index';

const expect = chai.expect;
// const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
  describe('/POST User Register', () => {
    it('It should sign up a new user', done => {
      const new_user = {
        firstname:
          'first_' +
          Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, ''),
        lastname:
          'last_' +
          Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, ''),
        password: 'anothertestpass2',
        email:
          Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '') + '@mail.com',
        type: 3,
        isAdmin: false,
        updated_at: new Date(),
        updated_by: 0,
        created_at: new Date()
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(new_user)
        .end((err, res) => {
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
});
