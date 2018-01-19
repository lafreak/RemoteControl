import io from 'socket.io-client';
let socket = io('http://localhost:6777');
//let socket = io('http://192.168.0.14:6777');

export { socket };