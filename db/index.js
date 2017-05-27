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

const conPromise = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      console.log('Connected succesfully to database');
      if(err) reject(err);
      else resolve(db);
    });
  })
}

const insert = function(data) {
  con(db => {
    model.insertDocuments(db, function() {
      db.close();
    }, data);
  })
}

const find = function() {
  var f = db => {
    return model.findDocuments(db, function() {
      db.close();
    })
  };
  return con(f);
}

const findPromise = function() {
  return conPromise()
    .then(db => {
      return model.findDocuments(db)
        .then((res) => {
          db.close();
          return res;
        });
    })
    .catch(console.log);
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
  findPromise,
  update,
  deleteEvents
}
