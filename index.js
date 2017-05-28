const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/events', require('./router/events.js'));

app.get('/', (req, res, next) => {
  res.send('Hello World!')
  next()
});

app.post('/', (request, response) => response.send("POST"))

app.use((err, request, response, next) => {
  response.send(err);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app;
