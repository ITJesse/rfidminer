
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var nfc = require('nfc').nfc;
var gameLogic = require('./modules/gameLogic');

var n = new nfc();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server, { log: false} );

io.sockets.on('connection', function(socket){
	console.log('OK');
	socket.on('touch', function(data){
		gameLogic.touch(socket, data);
	});
	n.on('uid', function(uid) {
		gameLogic.nfcScan(socket, uid.toString('hex'));
	});
});

n.start();
	
