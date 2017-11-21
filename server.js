const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var cors = require('cors')
app.use(cors())

var db

MongoClient.connect('mongodb://admin:admin@ds111565.mlab.com:11565/local_library', (err, database) => {
  if (err) return console.log(err)
  db = database
	 app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })
  
})

app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  })

app.post('/bookstore', (req, res) => {
  db.collection('bookstore').save(req.body, (err, result) => {
    if (err) return console.log(err)
if (result) {
			res.json(result)
		}
    console.log('saved to database')
    res.send("Saved to database")
      
  })
})

//app.listen(port);
//res.send('server running'+ port);


