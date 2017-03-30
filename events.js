const express = require('express');
const router = express.Router();

function Event(id, title, desc, date) {
  this.id = id;
  this.title = title;
  this.description = desc;
  this.date = date;
}

let eventInstance = new Event();

let arr = [];

for(let i=0; i<10; i++) {
  arr.push(new Event(i, `title `+i, 'desc '+i, 'date '+i));
}

router.get('/', (request, response, next) => {
  console.log("here")
  response.send(arr);
})

module.exports = router;
