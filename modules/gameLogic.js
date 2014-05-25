var mat = require('./mat');
var Mat = new mat();

var gameOver = function(socket){
	var mines = new Array();
	var count = 0;
	for(var i=0; i<=7; i++){
		for(var k=0; k<=7; k++){
			if(Mat.matrix[i][k]){
				mines[count] = {};
				mines[count].positionX = i+1;
				mines[count].positionY = k+1;
				count++;
			}
		}
	}
	var data = {
		'mines': mines
	};
	socket.emit('gameover', data);
};

var nfcList = {
	'9098aefe': {
		x: 0,
		y: 0
	},
	'96487abe': {
		x: 1,
		y: 0
	},
	'2f2a485f': {
		x: 2,
		y: 0
	},
	'7bbdfcac': {
		x: 3,
		y: 0
	},
	'5b25ea95': {
		x: 4,
		y: 0
	},
	'd6747abe': {
		x: 5,
		y: 0
	},
	'96904581': {
		x: 6,
		y: 0
	},
	'c01083b4': {
		x: 7,
		y: 0
	},
	'5d1467b8': {
		x: 0,
		y: 1
	},
	'3b94e995': {
		x: 1,
		y: 1
	},
	'1b163ba2': {
		x: 2,
		y: 1
	},
	'3b5ce7a4': {
		x: 3,
		y: 1
	},
	'5b21a2a4': {
		x: 4,
		y: 1
	},
	'8f986c51': {
		x: 5,
		y: 1
	},
	'fb73e495': {
		x: 6,
		y: 1
	},
	'2fb9b104': {
		x: 7,
		y: 1
	},
	'0460fb32da2380': {
		x: 0,
		y: 2
	},
	'04828a3a9a2880': {
		x: 1,
		y: 2
	}
};

exports.touch = function(socket, data){
	var positionX = data.positionX - 1;
	var positionY = data.positionY - 1;
	console.log('touch on:'+positionX+'|'+positionY);
	var status;
	Mat.pos_get(positionX, positionY, function(cnt, cur){
		console.log(cur);
		if(cur){
			socket.emit('status', true);
			return gameOver(socket);
		}else{
			return socket.emit('status', false);
		}
	});
}

exports.nfcScan = function(socket, uid){
	var positionX = nfcList[uid].x;
	var positionY = nfcList[uid].y;
	console.log(uid+'|'+positionX+'|'+positionY);
	Mat.pos_get(positionX, positionY, function(cnt, cur){
		var json = {
			'positionX': positionX + 1,
			'positionY': positionY + 1,
			'mine': cnt
		};
		socket.emit('position', json);
	});
}