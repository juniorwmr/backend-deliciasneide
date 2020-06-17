const socketio = require("socket.io");

let io;
let connections = [];

const setupWebSocket = server => {
	io = socketio(server);
	io.on("connection", socket => {
		connections.push({
			id: socket.id,
		})
		socket.on("register-pedido", message => {
			notifyUser(message);
		})
	});
};

const notifyUser = async (message) => {
	io.emit('notify-ser', message)
}

const sendMessage = async (message, data) => {
	io.emit(message, data);
};

module.exports = {
	setupWebSocket,
	sendMessage,
};