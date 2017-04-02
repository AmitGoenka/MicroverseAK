const express = require('express');
const router = express.Router();

function Event(id, title, desc, date) {
  this.id = id;
  this.title = title;
  this.description = desc;
  this.date = date;
}

let arr = [];

for(let i = 0; i < 10; i++) {
  arr.push(new Event(i, `title ` + i, 'desc ' + i, 'date ' + i));
}

router.get('/', (request, response, next) => {
  response.send(arr);
})

router.get('/:id', (request, response, next) => {
  const id = parseInt(request.params.id);
  response.send(arr.filter(x => {
    return x.id === id;
  }));
})

router.post('/', (request, response, next) => {
  newEvent = new Event(request.body.id, request.body.title, request.body.description, request.body.date);
  arr.push(newEvent);
  response.send(arr[arr.length - 1]);
});

module.exports = router;
