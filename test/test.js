const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../index.js');
chai.use(chaiHttp);

describe('/GET', () => {
  it('all events', (done) => {

    chai.request(app).get('/')
    .end((err, status) => {
      console.log("HERE");
      expect(err).to.be.null;
      expect(status).to.have.status(200);
      done();
    })

  })
})
