const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.send('Hello World!')
  next()
});

app.post('/', (request, response) => response.send("POST"))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
