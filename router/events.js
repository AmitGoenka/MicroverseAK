const express = require('express');
const router = express.Router();
const _ = require('lodash');
const db = require('../db/index');

function Event(id, title, desc, date) {
  this.id = id;
  this.title = title;
  this.description = desc;
  this.date = date;
}

function MongoEvent(title, desc, date) {
  this.title = title;
  this.description = desc;
  this.date = date;
}

router.get('/', (request, response, next) => {
  console.log("GET EVERYTHING");
  console.log(request.query);
  if (request.query) next();
  else {
    db.findPromise()
    .then(res => {
      response.send(res);
    })
    .catch(next);
  }
});

router.get('/:id', (request, response, next) => {
  console.log("GET ONLY ONE");
  const criteria = {'_id': request.params.id};
  db.findPromise(criteria)
  .then(res => {
    response.send(res);
  })
  .catch(next);
});

router.get('/', (request, response, next) => {
  console.log("SEARCH BY TITLE");
  const criteria = {'title': request.query.title};
  console.log(criteria);
  db.findPromise(criteria)
  .then(res => {
    response.send(res);
  })
  .catch(next);
});

router.post('/', (request, response, next) => {
  console.log("POST")
  var newEvent = new MongoEvent(request.body.title, request.body.description, request.body.date);
  var newEventArray = [];
  newEventArray.push(newEvent);

  db.insertPromise(newEventArray)
  .then(res => response.send(res))
  .catch(next);
});

router.put('/:id', (request, response, next) => {
  // const id = parseInt(request.params.id);
  // const req = request.body;
  // arr.forEach(curr => {
  //   if(curr.id === id) {
  //     if(req.title) curr.title = req.title;
  //     if(req.description) curr.description = req.description;
  //     if(req.date) curr.date = req.date;
  //     response.send(curr);
  //   }
  // });

  console.log("PUT");

  const id = request.params.id;
  const req = request.body;

  db.updatePromise(id, req)
    .then(res => response.send(res))
    .catch(next);
});

router.delete('/:id', (request, response, next) => {
  console.log('DELETE');
  db.deletePromise(request.params.id)
    .then(res => response.send(res))
    .catch(next);
});

module.exports = router;
