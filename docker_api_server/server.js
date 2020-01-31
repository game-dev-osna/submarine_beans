const express = require('express')

// Constants
const PORT = 80;
const HOST = '0.0.0.0'

// App
const app = express()
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(new Buffer('<h2>API</h2>'))
});

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)