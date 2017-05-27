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

const con = (action) => {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected succesfully to database');
    action(db);
  });
}

const insert = function(data) {
  con(db => {
    model.insertDocuments(db, function() {
      db.close();
    }, data);
  })
}

const find = function() {
  con(db => {
    model.findDocuments(db, function() {
      db.close();
    });
  })
}

const update = function(matcher, data) {
  con(db => {
    model.updateDocuments(db, function() {
      db.close();
    }, matcher, data);
  })
}

const deleteEvents = function(matcher) {
  con(db => {
    // Call delete documents here
    model.deleteDocuments(db, function() {
      db.close();
    }, matcher)
  })
}

module.exports = {
  insert,
  find,
  update,
  deleteEvents
}
