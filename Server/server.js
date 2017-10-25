var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 6777;

io.on('connection', function(socket) {
	if (socket.request.headers['is-client'] == "true") {
		console.log("Client connected.");
		socket.join('users');
	}
	else {
		console.log("Admin connected.");
		socket.join('admins');

		var m = [];
		var users = findAllInRoom('users');

		for (var i = 0; i < users.length; i++) {
			m.push({
				id: users[i].id
			});
		}

		socket.emit('clients', m);
	}
});

http.listen(port, function() {
	console.log(`Listening on port ${port}`);
});

function findAllInRoom(room) {
	var ret = [],
		room = io.sockets.adapter.rooms[room];
	if (room) {
		for (var id in room.sockets) {
			ret.push(io.sockets.adapter.nsp.connected[id]);
		}
	}

	return ret;
}