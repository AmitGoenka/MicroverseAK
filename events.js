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
  response.send(arr);
});

router.get('/:id', (request, response, next) => {
  const id = parseInt(request.params.id);
  response.send(arr.filter(x => {
    return x.id === id;
  }));
});

router.post('/', (request, response, next) => {
  console.log("post")
  // newEvent = new Event(request.body.id, request.body.title, request.body.description, request.body.date);
  // arr.push(newEvent);
  // response.send(arr[arr.length - 1]);
  // newEvent = new MongoEvent(request.body.title, request.body.description, request.body.date);
  db.insert();
  response.send("Response sent");
});

router.put('/:id', (request, response, next) => {
  const id = parseInt(request.params.id);
  const req = request.body;
  arr.forEach(curr => {
    if(curr.id === id) {
      if(req.title) curr.title = req.title;
      if(req.description) curr.description = req.description;
      if(req.date) curr.date = req.date;
      response.send(curr);
    }
  });
});

router.delete('/:id', (request, response, next) => {
  const id = parseInt(request.params.id);
  _.remove(arr, x => x.id === id)
  response.send(arr);
});


module.exports = router;
