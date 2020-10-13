import io from 'socket.io-client';
const socket = io.connect('http://localhost:1234');

export default socket;