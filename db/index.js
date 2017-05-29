var mongoose = require('mongoose');
var Events = require('./model.js');
const dbUrl = 'mongodb://localhost/microverse';

// const con = (action) => {
//   mongoose.connect(dbUrl);
//   var db = mongoose.connection;
//
//   db.on('error', console.error.bind(console, 'connection error:'));
//
//   db.once('open', () => {
//     console.log('Connected to database already');
//     action();
//   });
// }

const conPromise = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUrl);
    var db = mongoose.connection;

    db.on('error', () => {
      console.error.bind(console, 'connection error:');
      reject(db);
    });

    db.once('open', () => {
      console.log('Connected to database already');
      resolve(db);
    });
  })
}

const getSearchCriteria = matcher => {
  if (!matcher) return {};
  if (matcher._id) {
    return {'_id': matcher._id};
  } else if (matcher.title) {
    return {'title': matcher.title};
  } else {
    return {};
  }
}

const findPromise = function(matcher) {
  return conPromise()
    .then(db => {
      return Events.find(getSearchCriteria(matcher))
        .exec((err, results) => {
          console.log(results);
          db.close();
          return results;
        });
    })
    .catch(err => { return err; });
}

const insertPromise = function(data) {
  return conPromise()
    .then(db => {
      return Events.create(data, (err, results) => {
        // console.log("error", err);
        // console.log("results", results);
      })
      .then(results => {
        console.log("inside create", results);
        db.close();
        return results;
      });
    })
    .catch(err => { return err; });
}

module.exports = {
  findPromise,
  insertPromise
};
