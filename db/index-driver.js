const MongoClient = require('mongodb').MongoClient;
const model = require('./model-driver');
const assert = require('assert');

const dbUrl = 'mongodb://localhost:27017/microverse';

// const con = (action) => {
//   MongoClient.connect(dbUrl, function(err, db) {
//     assert.equal(null, err);
//     console.log('Connected succesfully to database');
//     action(db);
//   });
// }


// CONNECT
const conPromise = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      console.log('Connected succesfully to database');
      if(err) reject(err);
      else resolve(db);
      // reject("TESTING ERROR");
    });
  })
}

// const insert = function(data) {
//   con(db => {
//     model.insertDocuments(db, function() {
//       db.close();
//     }, data);
//   })
// }

// INSERT
const insertPromise = function(data) {
  return conPromise()
    .then(db => {
      return model.insertDocuments(db, data)
      .then(res => {
        console.log("from index.js ", res)
        db.close();
        return res;
      })
    })
    .catch(err => { return err; });
}

// const find = function() {
//   var f = db => {
//     return model.findDocuments(db, function() {
//       db.close();
//     })
//   };
//   return con(f);
// }

const findPromise = function(matcher) {
  return conPromise()
    .then(db => {
      return model.findDocuments(db, matcher)
        .then(res => {
          db.close();
          return res;
        });
    })
    .catch(err => { return err; });
}

// const update = function(matcher, data) {
//   con(db => {
//     model.updateDocuments(db, function() {
//       db.close();
//     }, matcher, data);
//   })
// }

const updatePromise = function(matcher, data) {
  return conPromise()
    .then(db => {
      return model.updateDocuments(db, matcher, data)
        .then(res => {
          db.close();
          return res;
        });
    })
    .catch(err => { return err; });
}

// const deleteEvents = function(matcher) {
//   con(db => {
//     // Call delete documents here
//     model.deleteDocuments(db, function() {
//       db.close();
//     }, matcher)
//   })
// }

const deletePromise = function(matcher) {
  return conPromise()
    .then(db => {
      return model.deleteDocuments(db, matcher)
        .then(res => {
          db.close();
          return res;
        });
    })
    .catch(err => { return err; });
}

module.exports = {
  insertPromise,
  findPromise,
  updatePromise,
  deletePromise
}
