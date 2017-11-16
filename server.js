const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  })

var db

MongoClient.connect('mongodb://admin:admin@ds111565.mlab.com:11565/local_library', (err, database) => {
  if (err) return console.log(err)
  db = database
  
})

app.post('/bookstore', (req, res) => {
  db.collection('bookstore').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.send("Saved to database")
      
  })
})

app.listen(port);
console.log('server running'+ port);


