const chalk = require('chalk')
const GameState = require('../models/GameState')

const SETTINGS = {
	MAX_AMOUNT_OF_CLIENTS: 4,
	MIN_AMOUNT_OF_CLIENTS: 0,
	LOOP_INTERVAL_TIME: 1000 / 60
}

class Game {
	constructor() {
		this._clients = []
		this._isCalculatingState = false
		this._loopIntervalId = ''	
		this._gameState = null
	}

	join(client) {
		if(this._clients.length > SETTINGS.MAX_AMOUNT_OF_CLIENTS)
			return

		console.log(`Client ${ chalk.blue(client.getUID()) } joined game`)
		this._clients.push(client)
	}

	start(client) {
		if(this._clients.length < SETTINGS.MIN_AMOUNT_OF_CLIENTS)
			return

		this._gameState = new GameState()

		console.log(`Client ${ chalk.blue(client.getUID()) } started the game`)
		this._loopIntervalId = setInterval(this._loop.bind(this), SETTINGS.LOOP_INTERVAL_TIME)
	}

	stop(client) {
		console.log(`Client ${ chalk.blue(client.getUID()) } stopped the game`)
		clearInterval(this._loopIntervalId)
		this._gameState = null
	}

	_broadcoast(type, payload) {
		this._clients.forEach( (client) => {
			client.send({
				type: type,
				payload: payload
			})
		})
	}

	_loop() {
		if(!this._gameState && this._gameState.getIsCalculating()) 
			return 
		
		this._gameState.calculate(this._clients.map(client => client.player))
	}
}

module.exports = Game
