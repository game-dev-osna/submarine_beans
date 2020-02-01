const chalk = require('chalk')
const WebSocket = require('ws')

const Client = require('./src/controllers/Client')
const Game = require('./src/controllers/Game')

const PORT = 8080
 
const server = new WebSocket.Server({ port: PORT })
const game = new Game()

server.on('connection', (socket) => {
	const client = new Client(socket, game)
	console.log(`New client with id ${ chalk.bgGreen.black(client.getUID()) } connected`)
})
