//var express = require('express');
//var fs = require('fs');
//var app = express();


//var socketIO = require('socket.io')

//var PORT = 6000

//const server = express()
//  .use((req, res) => res.sendFile(INDEX) )
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

//const io = socketIO(server);

//io.on('connection', (socket) => {
//  console.log('Client connected');
//  socket.on('disconnect', () => console.log('Client disconnected'));
//});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
var express = require('express')
  , bodyParser = require('body-parser');

var app = express();
var MongoClient = require('mongodb').MongoClient;
var dbObject;
var collection;
app.use(bodyParser.json());

app.post('/', function(request, response){
  	console.log(request.body);      // your JSON
   	response.send(request.body);    // echo the result back
   	collection.insert(request.body);

});

app.listen(7000, function() {
  console.log('Node app is running on port 7000');
});

// Retrieve

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/db", function(err, db) {
  if(!err) {
    console.log("We are connected");
    dbObject = db;
    collection = db.collection('test');

  } else{
  	console.log("Failed to connect!")
  }
});