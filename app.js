var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage

app.get('/', function (req, res) {
  console.log( __filename )
  res.send('hello world')
})
