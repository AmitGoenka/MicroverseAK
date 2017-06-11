const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../index.js');
chai.use(chaiHttp);

describe('/GET', () => {
  it('all events', (done) => {
    chai.request(app).get('/events/')
    .then(data => {
      expect(data).to.not.be.null;
      expect(data).to.have.status(200);
      done();
    })
    .catch(err => {
      console.log('err: ' + err);
      done();
    })
  });

  it('event by id', (done) => {
    var id = 1;
    chai.request(app)
      .get(`/events/${id}`)
      .then((data) => {
        expect(data.body[0]).to.not.be.null;
        expect(data.body[0].title).to.equal('title 1');
        expect(data.body[0].description).to.equal('desc 1');
        // expect(data.body).to.deep.equal([ { id: 1, title: 'title 1', description: 'desc 1'} ]);
        done();
      })
      .catch(err => {
        console.log('err: ', err);
        done();
      });
  });

  it('event by title', (done) => {
    var title = 'title something';
    chai.request(app)
      .get(`/events?title=${title}`)
      .then((data) => {
        expect(data.body[0]).to.not.be.null;
        expect(data.body[0].title).to.equal(title);
        done();
      })
      .catch(err => {
        console.log('err: ', err);
        done();
      });
  });
});

describe('/POST', () => {
  it('create event', (done) => {
    const event = { id: 50, title: 'title 50', description: 'desc 50', date: new Date().toString() };
    chai.request(app)
      .post('/events/')
      .send(event)
      .then(data => {
        // console.log(data.body);
        // console.log(event);
        expect(data.body).to.not.be.null;
        expect(data.body).to.deep.equal(event);
        done();
      })
      .catch(err => {
        console.log('err: ' + err);
        done();
      });
  });
});

describe('/PUT', () => {
  it('update event', (done) => {
    const id = 1;
    const event = { id: id, title: 'title 50', description: 'desc 50', date: new Date().toString() };
    chai.request(app)
      .put(`/events/${id}`)
      .send(event)
      .then(data => {
        // console.log(data.body);
        // console.log(event);
        expect(data.body).to.deep.equal(event);
        done();
      })
      .catch(err => {
        console.log('err: ' + err);
        done();
      });
  });
});

describe('/DELETE', () => {
  it('delete event', (done) => {
    const id = 1;
    // const event = { id: id, title: 'title 50', description: 'desc 50', date: new Date().toString() };
    chai.request(app)
      .delete(`/events/${id}`)
      .then(data => {
        // console.log(data.body);
        // console.log(event);
      data.body.forEach(curr => {
        expect(curr).to.not.include.keys(id);
      })
        done();
      })
      .catch(err => {
        console.log('err: ' + err);
        done();
      });
  });
});
