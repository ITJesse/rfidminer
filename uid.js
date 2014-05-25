var nfc = require('nfc').nfc;
var fs = require('fs');
var n = new nfc();

fs.open("uid.txt","a",0644,function(e,fd){
    if(e) throw e;
});

var last_uid;


n.on('uid', function(uid){
	if(last_uid != uid.toString('hex')){
		console.log(uid.toString('hex'));
		fs.open("uid.txt","a",0644,function(e,fd){
			if(e) throw e;
			fs.write(fd, uid.toString('hex')+'\r\n', 0, 'utf8', function(e){
				if(e) throw e;
				fs.closeSync(fd);
			});
		});
		last_uid = uid.toString('hex');
	}
});

n.start();