const GAME_SETTINGS = require('../settings')

class GameState {
	constructor() {
		this._isCalculating = false
		this._state = {
			meta: {
				serverTime: new Date(),
				amountOfPlayers: 0
			},
			players: []
		}
	}

	getIsCalculating() {
		return this._isCalculating
	}

	_setMeta(players) {
		this._state.meta = {
			serverTime: new Date(),
			amountOfPlayers: players.length
		}
	}

	_setPlayers(players) {
		this._state.players = players.map( player => player.getState() )
	}

	calculate(players) {
		// Block
		this._isCalculating = true
		return new Promise((resolve, reject) => {
			try {
				// Calculate
				this._calculatePhysics(players)
				this._setMeta(players)
				this._setPlayers(players)

				// Unblock
				this._isCalculating = false

				resolve(this._state)
			} catch(error) {
				reject(error)
			}
		})
	}

	_calculatePhysics(players) {
		players.forEach( player => {
			const { up, down, left, right } = player.getInputs()
			
			if(up) {
				player.accelerate(GAME_SETTINGS.ACCELARATION_FACTOR * GAME_SETTINGS.LOOP_INTERVAL_TIME)
			}
			else if(down) {
				player.accelerate(GAME_SETTINGS.ACCELARATION_FACTOR * GAME_SETTINGS.LOOP_INTERVAL_TIME / -2.0)
			}	
			
			if(left) {
				player.rotate(-GAME_SETTINGS.PLAYER_ROTATION_SPEED)
			}
			else if(right) {
				player.rotate(GAME_SETTINGS.PLAYER_ROTATION_SPEED)
			}	

			player.update(GAME_SETTINGS.LOOP_INTERVAL_TIME)
		})
	}
}

module.exports = GameState
