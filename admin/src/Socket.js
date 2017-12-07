import io from 'socket.io-client';
//let socket = io('http://145.239.82.140:6777');
//let socket = io('localhost:6777');
let socket = io('192.168.137.1:6777');
export { socket };