const uuidv4 = require('uuid/v4')
const Player = require('../models/Player')

class Client {

	constructor(socket, game) {
		// public
		this.uID = uuidv4()
		this.player = new Player(this.uID)

		// private
		this._socket = socket
		this._game = game
		this._registerEvents()
	}

	_registerEvents() {
		this._socket.on('message', (message) => {
			this._processMessage(JSON.parse(message))
		})
		// ws.send('something')
	}

	_processInput(payload) {
		console.log(payload)
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