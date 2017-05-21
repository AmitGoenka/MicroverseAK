/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microverse');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected")
});

module.exports = db;
*/

const MongoClient = require('mongodb').MongoClient;
const model = require('./model-driver');
const assert = require('assert');

const dbUrl = 'mongodb://localhost:27017/microverse';

var insert = function(data) {
  MongoClient.connect(dbUrl, function(err, db) {
  assert.equal(null, err);
  console.log('Connected succesfully to database');

  model.insertDocuments(db, function() {
    db.close();
  }, data)
});
}

module.exports = {
  insert
}
