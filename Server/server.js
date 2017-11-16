var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 6777;

io.on('connection', function(socket) {

	var address = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;

	if (socket.request.headers['is-client'] == "true") {
		console.log(`Client ${socket.id} connected.`);
		console.log(`Name : ${socket.request.headers['name']}`)
		console.log(`Mac : ${socket.request.headers['mac']}`)
		console.log(`Processor info : ${socket.request.headers['processor-info']}`)
		console.log(`RAM : ${socket.request.headers['memory']}`)
		console.log(`OS : ${socket.request.headers['os']}`)
		socket.join('users');

		io.to('admins').emit('client_connected', {
			id: socket.id,
			name: socket.request.headers['name'],
			mac: socket.request.headers['mac'],
			processor_info: socket.request.headers['processor-info'],
			memory: socket.request.headers['memory'],
			os: socket.request.headers['os'],
			ip: address
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

	socket.on('processes', function(data) {
    	var e = JSON.parse(data);
    	io.to(e.CallbackAdminId).emit('user#processes', { id: socket.id, list: e.List });
  	});

  	socket.on('log', function(data) {
    	var e = JSON.parse(data);
    	io.to(e.CallbackAdminId).emit('user#log', { message: e.Message, title: e.Title });
  	});
}

function bindAdmin(socket) {
	socket.on('disconnect', function() {
		console.log(`Admin ${socket.id} disconnected.`)
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