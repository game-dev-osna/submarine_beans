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
				player.translate({ translateY: -GAME_SETTINGS.PLAYER_SPEED })
			}
			else if(down) {
				player.translate({ translateY: GAME_SETTINGS.PLAYER_SPEED })
			}	
			
			if(left) {
				player.translate({ translateX: -GAME_SETTINGS.PLAYER_SPEED })
			}
			else if(right) {
				player.translate({ translateX: GAME_SETTINGS.PLAYER_SPEED })
			}	
		})
	}
}

module.exports = GameState
