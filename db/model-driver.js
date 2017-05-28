const assert = require('assert');
const Mongo = require('mongodb');

const insertDocuments = function(db, callback, data) {
  const events = db.collection('events');
  events.insertMany(data,
  function(err, result) {
    assert.equal(err, null);
    console.log(result);
    assert.equal(data.length, result.result.n);
    assert.equal(data.length, result.ops.length);
    console.log('Inserted events successfully');
    callback(result);
  });
}

// [
//   { "title": "title 1", "description": "desc 1", "date": "date 1" },
//   { "title": "title 2", "description": "desc 2", "date": "date 2" },
//   { "title": "title 3", "description": "desc 3", "date": "date 3" },
//   { "title": "title 4", "description": "desc 4", "date": "date 4" },
//   { "title": "title 5", "description": "desc 5", "date": "date 5" }
// ]


const findDocuments = function(db) {
  const events = db.collection('events');

  const prom = new Promise((resolve, reject) => {

    events.find({
      // "_id": new Mongo.ObjectID(matcher)
    }).toArray((err, res) => {
      console.log('errors from find', err);
      console.log('res from find', res);
      // if(err) reject(err);
      // else resolve(res);
      reject("TESTING ERROR WITH EXPRESS")
    });

  });

  return prom;
}

const updateDocuments = function(db, callback, matcher, data) {
  const events = db.collection('events');
  events.updateOne({
    "_id": matcher
  },{
    $set: {
      "title": data.title
    }
  },
  function(err, result) {
    assert.equal(err, null);
    console.log(result);
    console.log('Updated events successfully');
    callback(result);
  });
}

const deleteDocuments = (db, callback, matcher) => {
  const events = db.collection('events');

  // events.find({
  //   "_id": new Mongo.ObjectID(matcher)
  // }).toArray((err, res) => {
  //   console.log('erros from find', err);
  //   console.log('res from find', res);
  // });

  events.findOneAndDelete({
    "_id": new Mongo.ObjectID(matcher)
  }, (err, result) => {
    assert.equal(err, null);
    console.log('Deleted events successfully');
    callback(result);
  })
}

module.exports = {
  insertDocuments,
  findDocuments,
  updateDocuments,
  deleteDocuments
};
