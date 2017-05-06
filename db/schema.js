var mongoose = require('mongoose');
var db = require('./index.js');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
  title: String,
  description: String,
  date: Date
})

module.exports = eventsSchema;
