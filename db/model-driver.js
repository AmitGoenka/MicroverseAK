const assert = require('assert');

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

const updateDocuments = function(db, callback, data) {
  const events = db.collection('events');
  events.updateOne({
    "_id": `Object_id(${data.id})`
  },{
    $set: {
      "title": data.title
    }
  },
  function(err, result) {
    assert.equal(err, null);
    console.log(result);
    assert.equal(data.length, result.result.n);
    assert.equal(data.length, result.ops.length);
    console.log('Updated events successfully');
    callback(result);
  });
}

module.exports = {
  insertDocuments,
  updateDocuments
};
