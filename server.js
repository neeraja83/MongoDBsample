const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var port = process.env.PORT || 11565;


app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  })

var db

MongoClient.connect('mongodb://admin:admin@ds111565.mlab.com:11565/local_library', (err, database) => {
  if (err) return console.log(err)
  db = database
  
})

app.get('/bookstore', (req, res) => {
  db.collection('bookstore').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.send("Saved to database")
      
  })
})

app.listen(port);
res.send('server running'+ port);


