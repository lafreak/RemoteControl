var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 6777;

io.on('connection', function(socket) {
	if (socket.request.headers['is-client'] == "true") {
		console.log("Client connected.")
	}
	else {
		console.log("Admin connected.")
	}
});

http.listen(port, function() {
	console.log(`Listening on port ${port}`);
});