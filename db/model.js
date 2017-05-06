var eventsSchema = require('./schema.js');
var mongoose = require('mongoose');

var Events = mongoose.model('Events', eventsSchema);

Events.find()
.exec((err, results) => {
  console.log(results[0].title)
})

Events.create({
  title: "title 6",
  description: "desc 6",
  date: Date.now()
},
(err, res) => {
  console.log(res)
});
