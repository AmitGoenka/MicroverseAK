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

const updateDocuments = function(db, callback, matcher, data) {
  const events = db.collection('events');

  // events.findOne({
  //   "_id": `5921a787c75ea1e4d7106a36`
  // }, console.log);

  console.log(matcher);

  // "_id": new Mongo.ObjectID(matcher)
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
    // assert.equal(data.length, result.result.n);
    // assert.equal(data.length, result.ops.length);
    console.log('Updated events successfully');
    callback(result);
  });
}

module.exports = {
  insertDocuments,
  updateDocuments
};
