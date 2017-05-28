const express = require('express');
const router = express.Router();
const _ = require('lodash');
const db = require('./db/index.js');

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

let arr = [];

for(let i = 0; i < 10; i++) {
  arr.push(new Event(i, `title ` + i, 'desc ' + i, new Date().toString()));
}

router.get('/', (request, response, next) => {
  console.log("GET EVERYTHING");
  db.findPromise()
  .then(res => {
    response.send(res);
  })
  .catch(next);
});

router.get('/:id', (request, response, next) => {
  const id = parseInt(request.params.id);
  response.send(arr.filter(x => {
    return x.id === id;
  }));
});

router.post('/', (request, response, next) => {
  console.log("POST")
  var newEvent = new MongoEvent(request.body.title, request.body.description, request.body.date);
  var newEventArray = [];
  newEventArray.push(newEvent);

  db.insertPromise(newEventArray)
  .then(res => {
    response.send(res);
  })
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

  console.log("PUT")

  const id = request.params.id;
  const req = request.body;

  db.update(id, req);
  response.send("Event updated");
});

router.delete('/:id', (request, response, next) => {
  console.log('id ', request.params.id);
  db.deleteEvents(request.params.id);
  response.send("Deleted");
});

module.exports = router;
