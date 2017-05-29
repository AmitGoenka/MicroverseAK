var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
  title: String,
  description: String,
  date: String
})

module.exports = eventsSchema;
