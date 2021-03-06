var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});
io.on('connection', function(socket){
	socket.on('sendMsg', function(msg){
		console.log(msg);
		io.emit('message', msg);
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});