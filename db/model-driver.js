const assert = require('assert');
const Mongo = require('mongodb');

const insertDocuments = function(db, data) {
  const events = db.collection('events');
  const prom = new Promise((resolve, reject) => {
    events.insertMany(data,
      function(err, result) {
        assert.equal(err, null);
        console.log(result);
        assert.equal(data.length, result.result.n);
        assert.equal(data.length, result.ops.length);
        console.log('Inserted events successfully');
        if(err) reject(err);
        else resolve(result.ops);
      });
  })
  return prom;
}

// [
//   { "title": "title 1", "description": "desc 1", "date": "date 1" },
//   { "title": "title 2", "description": "desc 2", "date": "date 2" },
//   { "title": "title 3", "description": "desc 3", "date": "date 3" },
//   { "title": "title 4", "description": "desc 4", "date": "date 4" },
//   { "title": "title 5", "description": "desc 5", "date": "date 5" }
// ]


const findDocuments = function(db, matcher) {
  const criteria = matcher ? {
    "_id": new Mongo.ObjectID(matcher)
  } : {};

  const events = db.collection('events');
  const prom = new Promise((resolve, reject) => {
    events.find(criteria)
    // {
    //   "_id": new Mongo.ObjectID(matcher)
    // }
    .toArray((err, res) => {
      console.log('errors from find', err);
      console.log('res from find', res);
      if(err) reject(err);
      else resolve(res);
      // reject("TESTING ERROR WITH EXPRESS")
    });
  });
  return prom;
}

const updateDocuments = function(db, matcher, data) {
  const events = db.collection('events');
  const prom = new Promise((resolve, reject) => {
    events.updateOne({
      "_id": new Mongo.ObjectID(matcher)
    },{
      $set: {
        "title": data.title
      }
    },
    function(err, res) {
      console.log('Updated events successfully');
      if(err) reject(err);
      else resolve(res);
    });
  })
  return prom;
}

const deleteDocuments = (db, matcher) => {
  const events = db.collection('events');
  const prom = new Promise((resolve, reject) => {
    events.findOneAndDelete({
      "_id": new Mongo.ObjectID(matcher)
    }, (err, res) => {
      assert.equal(err, null);
      console.log('Deleted events successfully');
      if(err) reject(err);
      else resolve(res.value);
    })
  });
  return prom;
}

module.exports = {
  insertDocuments,
  findDocuments,
  updateDocuments,
  deleteDocuments
};
