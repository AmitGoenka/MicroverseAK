const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (request, response) => response.send("POST"))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
