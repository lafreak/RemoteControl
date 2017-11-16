var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 6777;

io.on('connection', function(socket) {
	if (socket.request.headers['is-client'] == "true") {
		console.log(`Client ${socket.id} connected.`);
		console.log(`Name : ${socket.request.headers['name']}`)
		console.log(`Mac : ${socket.request.headers['mac']}`)
		console.log(`Processor info : ${socket.request.headers['processor-info']}`)
		console.log(`RAM : ${socket.request.headers['memory']}`)
		console.log(`OS : ${socket.request.headers['os']}`)
		socket.join('users');

		io.to('admins').emit('client_connected', {
			id: socket.id
		});

		bindClient(socket);
	}
	else {
		console.log(`Admin ${socket.id} connected.`);
		socket.join('admins');

		var m = [];
		var users = findAllInRoom('users');

		for (var i = 0; i < users.length; i++) {
			m.push({
				id: users[i].id
			});
		}

		socket.emit('clients', m);
		bindAdmin(socket);
	}
});

function bindClient(socket) {
	socket.on('disconnect', function() {
		io.to('admins').emit('client_disconnected', {id:socket.id})
		console.log(`User ${socket.id} disconnected.`)
	});
}

function bindAdmin(socket) {
	socket.on('disconnect', function() {
		console.log(`Admin ${socket.id} disconnected.`)
	});
	socket.on('processes', function(data) {
		io.to(data.id).emit('processes', { callbackAdminId: socket.id });
		console.log(`Admin ${socket.id} requests processes of ${data.id}`);
	});
	socket.on('kill_process', function(data) {
		io.to(data.id).emit('kill_process', {callbackAdminId: socket.id, processId: data.processId});
		console.log(`Admin ${socket.id} requests process kill ${data.processId}`);
	});
}

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