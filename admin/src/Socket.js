import io from 'socket.io-client';
let socket = io('http://localhost:6777');

export { socket };