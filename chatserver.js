var http = require('http');
var sockio = require('socket.io');
var fs=require('fs');
var io;
var port = [];
var server;
var arr = [];
server = http.createServer(function(req, res){
res.writeHead(200,{'Content-Type':'text/html'});
	var myReadStream = fs.createReadStream(__dirname + '/sockindex.html','utf8');
	myReadStream.pipe(res);
	});
server.listen(3000);
io=sockio(server);
var clients=0;
var socketId;
io.on('connection',function(socket){
	 clients++;
	
	console.log("clients connected: "+ clients);
socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
var clientPort= socket.request.connection.remotePort;

		socket.on('clientMessage',function(message){
		console.log(message);
		arr.push(message);
		console.log(arr);
		socket.emit('pmessage', message);
		socket.broadcast.emit('message', message);
		
		
	});
	
 socket.on('disconnect', function () {
		 clients--;
		 	 console.log("clients connected: "+ clients);

		 });

		
});

