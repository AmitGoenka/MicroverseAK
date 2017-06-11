var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
  title: String,
  description: String,
  date: String
})

var usersSchema = new Schema({
  username: String,
  password: String,
  email: String,
  fullName: String
})

module.exports = {
  eventsSchema,
  usersSchema
}
