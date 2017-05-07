const assert = require('assert');

const insertDocuments = function(db, callback) {
  const events = db.collection('events');
  events.insertMany([
    { "title": "title 1", "description": "desc 1", "date": "date 1" },
    { "title": "title 2", "description": "desc 2", "date": "date 2" },
    { "title": "title 3", "description": "desc 3", "date": "date 3" },
    { "title": "title 4", "description": "desc 4", "date": "date 4" },
    { "title": "title 5", "description": "desc 5", "date": "date 5" }
  ],
  function(err, result) {
    assert.equal(err, null);
    console.log(result);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log('Inserted 5 events successfully');
    callback(result);
  });
}

module.exports = {
  insertDocuments
};