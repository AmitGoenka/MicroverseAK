const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('./index.js');

chai.use(chaiHttp);

chai.request("http://localhost:3000").get('/')
.end((err, status) => {
  console.log("HERE");
  chai.expect(err).to.be.null;
  chai.expect(status).to.have.status(200);
})
