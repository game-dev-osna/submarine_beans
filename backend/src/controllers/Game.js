const chalk = require('chalk')

const SETTINGS = {
	MAX_AMOUNT_OF_USERS: 4,
	MIN_AMOUNT_OF_USERS: 0,
	LOOP_INTERVAL_TIME: 1000 / 60
}

class Game {
	constructor() {
		this._players = []
		this._isCalculatingState = false
		this._loopIntervalId = ''	
	}

	join(user) {
		if(this._players.length > SETTINGS.MAX_AMOUNT_OF_USERS)
			return

		console.log('Player joined game')
		this._players.push(user)
	}

	start(client) {
		if(this._players.length < SETTINGS.MIN_AMOUNT_OF_USERS)
			return

		console.log(`Client ${chalk.blue(client.uID)} started the game`)
		this._loopIntervalId = setInterval(this._loop.bind(this), SETTINGS.LOOP_INTERVAL_TIME)
	}

	stop(client) {
		console.log(`Client ${chalk.blue(client.uID)} stopped the game`)
		clearInterval(this._loopIntervalId)
	}

	_loop() {
		if(!this._isCalculatingState) {
			this._calculateState()
		}
	}

	_calculateState() {
		this._isCalculatingState = true
		console.log('Game is running ...')
		this._isCalculatingState = false
	}
}

module.exports = Game
