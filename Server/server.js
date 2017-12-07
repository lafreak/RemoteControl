var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 6777;

io.on('connection', function(socket) {

	if (socket.request.headers['is-client'] == "true") {
		socket.join('clients');

		socket.info = {
			id: socket.id,
			name: socket.request.headers['name'],
			mac: socket.request.headers['mac'],
			processor_info: socket.request.headers['processor-info'],
			memory: socket.request.headers['memory'],
			os: socket.request.headers['os'],
			ip: ip(socket)
		};

		io.to('admins').emit('client_connected', socket.info);

		bindClient(socket);
	}
	else {
		console.log(`Admin ${socket.id} connected.`);
		socket.join('admins');

		socket.emit('clients', clients());

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
    io.to(e.CallbackAdminId).emit('processes', { id: socket.id, list: e.List });
  });

  socket.on('log', function(data) {
  	var e = JSON.parse(data);
    io.to(e.CallbackAdminId).emit('log', { message: e.Message, title: e.Title });
	});
}

function bindAdmin(socket) {
	socket.on('disconnect', function() {
		console.log(`Admin ${socket.id} disconnected.`)
	});
	socket.on('processes', function(data) {
		io.to(data.id).emit('processes', { callbackAdminId: socket.id });
		console.log(`Admin ${socket.id} requests processes of ${data.id}`);

		// Example File Explorer emits
		/*
		socket.emit('files', {
			ClientId: '151gkeigjo43ti34i',
			OriginalPath: 'PC',
			Files: [
				{ type: 1, fullPath: 'C:', name: 'C:', children: [] },
				{ type: 1, fullPath: 'F:', name: 'F:', children: [] }
			]
		});

		socket.emit('files', {
			ClientId: '151gkeigjo43ti34i',
			OriginalPath: 'F:',
			Files: [
				{ type: 1, fullPath: 'F:/Ads', name: 'Ads', children: [] },
				{ type: 2, fullPath: 'F:/lol.png', name: 'lol.png' }
			]
		});
		*/
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
	var ret = [], room = io.sockets.adapter.rooms[room];
	if (room) {
		for (var id in room.sockets) {
			ret.push(io.sockets.adapter.nsp.connected[id]);
		}
	}

	return ret;
}

function clients() {
	var ret = [], room = io.sockets.adapter.rooms['clients'];
	if (room) {
		for (var id in room.sockets) {
			ret.push(io.sockets.adapter.nsp.connected[id].info);
		}
	}

	return ret;
}

function ip(client) {
  var address = client.request.headers['x-forwarded-for'] || client.request.connection.remoteAddress;
  return address.replace(/^.*:/, '');
}