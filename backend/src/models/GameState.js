const uuidv4 = require('uuid/v4')

const GAME_SETTINGS = require('../settings')

const MissileObject = require('./game_objects/MissileObject')

class GameState {
	constructor() {
		this._isCalculating = false
		this._gameObjects = {
			missiles: []
		},
		this._state = {
			meta: {
				serverTime: new Date(),
				amountOfPlayers: 0
			},
			players: [],
			missiles: []
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

	_setMissiles() {
		this._state.missiles = this._gameObjects.missiles.map( missile => missile.getState() )
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
				this._setMissiles()

				// Unblock
				this._isCalculating = false

				resolve(this._state)
			} catch(error) {
				reject(error)
			}
		})
	}

	_calculatePhysics(players) {
		// PLAYERS
		players.forEach( player => {
			const { up, down, left, right, s_key } = player.getInputs()
			
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

			const currentDate = new Date()
			// @ts-ignore
			if(s_key && (currentDate - player.getLastInteractionDate()) > GAME_SETTINGS.INTERACTION_PAUSE) {
				// SPAWN AN MISSILE
				const missile = new MissileObject(`MISSILE-${ uuidv4() }`)
				missile.setAngle(player.getAngle())
				missile.setPosition(player.getPosition())
				missile.accelerate(GAME_SETTINGS.MISSILE_SPEED * GAME_SETTINGS.LOOP_INTERVAL_TIME)
				this._gameObjects.missiles.push(missile)
				player.setLastInteractionDate(currentDate)
			}

			player.update(GAME_SETTINGS.LOOP_INTERVAL_TIME)
		})

		// MISSILES
		this._gameObjects.missiles.forEach(missile => {
			missile.update(GAME_SETTINGS.LOOP_INTERVAL_TIME)
		})
	}
}

module.exports = GameState
