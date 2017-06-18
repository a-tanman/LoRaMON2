var express = require('express');
var app = express();
var firebase = require("firebase")
var http = require('http').Server(app)
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
//var Highcharts = require('highcharts');

//http.globalAgent.maxSockets = 40;

var config = {
    apiKey: "AIzaSyBzThV8_xhv4aQms2u1-GBkqMBg_nN-jgU",
    authDomain: "ah10aa-fedac.firebaseapp.com",
    databaseURL: "https://ah10aa-fedac.firebaseio.com",
    projectId: "ah10aa-fedac",
    storageBucket: "ah10aa-fedac.appspot.com",
    messagingSenderId: "966788310626"
};
//firebase.initializeApp(config);

io.on('connection',function(socket){
	console.log('User connected');
	//socket.send('9');
})

var volt = 9;
var new_volt;
var old_volt=0;
var collection;

MongoClient.connect("mongodb://localhost:27017/db", function(err,db){
	if(err) { return console.dir(err); }

  collection = db.collection('test');

  
})


setInterval(() => {
    
collection.find({}).toArray(function(err, docs) {
    //console.log(docs[docs.length-1]);
    //console.log(docs.length)
    new_volt = docs[docs.length-1]
    //if(new_volt != old_volt){
    io.emit('message', new_volt['voltage']);
    console.log(new_volt['voltage']);
    //old_volt = new_volt;
	//}	
  });
    
}, 500);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);