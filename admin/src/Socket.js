import io from 'socket.io-client';
let socket = io('http://192.168.137.1:6777');

export { socket };