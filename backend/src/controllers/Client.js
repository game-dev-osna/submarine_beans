const uuidv4 = require('uuid/v4')
const Player = require('../models/game_objects/Player')

class Client {

	constructor(socket, game) {
		this._uID = uuidv4()
		this._player = new Player(this._uID)
		this._socket = socket
		this._game = game

		this._registerEvents()
	}

	getUID() {
		return this._uID
	}

	getPlayer() {
		return this._player
	}

	send(message) {
		this._socket.send(JSON.stringify(message))
	}

	_registerEvents() {
		this._socket.on('message', (message) => {
			this._processMessage(JSON.parse(message))
		})
	}

	_processInput(payload) {
		this._player.setInputs(payload)
	}

	_processGeneral(payload) {
		switch (payload.command) {
			case 'join':
				this._game.join(this)
				break
			case 'start':
				this._game.start(this)
				break
			case 'stop':
				this._game.stop(this)
				break
			default:
				break
		}
	}

	_processMessage(message) {
		switch (message.type) {
			case 'input':
				this._processInput(message.payload)
				break
			case 'general': 
				this._processGeneral(message.payload)
				break
			default:
				console.error(`Unknow messageType: ${ message }`)
				break
		}
	}
}

module.exports = Client
