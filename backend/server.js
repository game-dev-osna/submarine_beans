const WebSocket = require('ws')
const Client = require('./src/controllers/Client')

const PORT = '8080'

const clients = []
const server = new WebSocket.Server({ port: PORT })

const Game = require('./src/controllers/Game')
const game = new Game()

server.on('connection', connection = (socket) => {
	console.log('New client connected...')
	const client = new Client(socket, game)
	clients.push(client)
})
