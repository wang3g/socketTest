// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express


//var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');


  var path = require('path');
  var rootPath = path.normalize(__dirname);

  console.log('rootPath: '+rootPath);
  app.use(express.static(rootPath + '/public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	//res.json({ message: 'hooray! welcome to our api!' });	
	//res.send("<h style='color: red'>Hello World!</h>");
	res.sendfile('./index.html');
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
//app.listen(port);

server.listen(port);

console.log('Magic happens on port ' + port);

io.on('connection', function (socket) {
  console.log('a client has just connected.');
  socket.emit('welcome', { hello: 'Welcome to my Socket.io test page.' });
  socket.on('send message', function (data) {
  	io.emit('broadcast message',{broadcast: data.sendMsg});
    console.log(data);
  });
});