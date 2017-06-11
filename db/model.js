var eventsSchema = require('./schema.js').eventsSchema;
var usersSchema = require('./schema.js').usersSchema;
var mongoose = require('mongoose');

var Events = mongoose.model('Events', eventsSchema);
var Users = mongoose.model('Users', usersSchema);
//
// Events.find()
//   .exec((err, results) => {
//     console.log(results[0].title);
//     return results;
//   })
//
// Events.create({
//   title: "title 6",
//   description: "desc 6",
//   date: Date.now()
// },
// (err, res) => {
//   console.log(res)
// });


module.exports = {
  Events,
  Users
}
