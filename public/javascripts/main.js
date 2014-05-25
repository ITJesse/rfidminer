var current = {
	px: 1,
	py: 1,
	num: -1,
	lock: false,
};

var gameStatus = 0; /*1 for success; -1 for lose*/
var count = 0;
// var http = require('http');  
// var io = require('socket.io');

function initGame() {
	current = {
		px: 1,
		py: 1,
		num: -1,
		lock: false,
	};
	var gameStatus = 0; /*1 for success; -1 for lose*/
	var count = 0;
}

var socket = io.connect();

socket.on('connection', function(data){
	console.log('OK');
});

socket.on('position', function (data) {
	console.log(data);
	var dataTemp = data;
	if (dataTemp) {
		if (dataTemp.positionX && dataTemp.positionY)
			displayStatus(dataTemp.positionX, dataTemp.positionY, dataTemp.mine);
	};
	//...
});

socket.on('gameover', function(data){
	for (i = 0; i < data.mines.length; i++) {
		displayEachMine(data.mines[i].positionX, data.mines[i].positionY);
	}
});

$(".sweep-btn").on('click', function(){
    socket.emit('touch', {
		positionX: current.px,
		positionY: current.py
	});
	socket.on('status', function (st) {
		console.log(st);
		if (st) {
			gameOver();
			return;
		};
	});

	current.lock = true;
	count++;
});

$(".restart-btn").on('click', function(){
	newGame();
});

function displayStatus(px, py, num) {
	// $(".tile-container").html('<div class="tile-cell"></div>');
	if(!(current.px == px && current.py == py) && current.lock == false) {
		$(".tile-cell-"+current.px+"-"+current.py).remove();
	}
	
	if (current.lock && !(current.px == px && current.py == py)) {
		current.lock = false;
	};	
	
	if(!$(".tile-cell").hasClass("tile-cell-"+current.px+"-"+current.py))
		$('<div class="tile-cell tile-cell-'+px+'-'+py+'"></div>').prependTo(".tile-container");

	var tempy = ((py - 1) * 80);
	var tempx = ((px - 1) * 80);
	$(".tile-cell-"+px+"-"+py).css({
		position: "absolute",
		top: tempy+"px",
		left: tempx+"px",
	});

	current.px = px;
	current.py = py;
	current.num = num;

	switch(num) {
		case -1:
			$(".tile-cell-"+px+"-"+py).text("Lost");break;
		case 0: 
			$(".tile-cell-"+px+"-"+py).text("Perfect");break;
		default:
			$(".tile-cell-"+px+"-"+py).css("font-size", "48px");
			$(".tile-cell-"+px+"-"+py).text(num);
	}
}

function displayEachMine(tx,ty) {
	$('<div class="tile-cell tile-cell-'+tx+'-'+ty+'"></div>').prependTo(".tile-container");
	$(".tile-cell-"+tx+"-"+ty).text("触");

	var tempy = ((ty - 1) * 80);
	var tempx = ((tx - 1) * 80);
	$(".tile-cell-"+tx+"-"+ty).css({
		position: "absolute",
		top: tempy+"px",
		left: tempx+"px",
		fontSize: "48px"
	});
}

function newGame() {
	$(".tile-container").remove();
	$("<div class='tile-container'></div>").appendTo(".game-container");
	initGame();
	$(".gameover").css({
		display: "none",
		zIndex: -1
	});
}

function gameOver() {
	if (gameStatus) {
		$(".gameover").text("Counter-Terrorists Win!");
	}
	else {
		$(".gameover").text("Terrorists Win!");
	}
	$(".gameover").css({
		display: "block",
		zIndex: 5
	});
}

// function removeStatus(px, py) {
// 	if(!(current.px == px & current.py == py))
// 		$(".tile-cell-"+current.px+"-"+current.py).remove();
// 	else
// 		return;
// }

