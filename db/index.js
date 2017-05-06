var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microverse');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected")
});

module.exports = db;
