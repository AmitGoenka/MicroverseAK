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
      reject();
    });

    db.once('open', () => {
      console.log('Connected to database already');
      resolve();
    });
  })
}

const findPromise = function(matcher) {
  return conPromise()
    .then(() => {
      return Events.find()
        .exec((err, results) => {
          console.log(results);
          return results;
        });
    })
    .catch(err => { return err; });
}

module.exports = {
  findPromise
};
