
const GameObject = require('./GameObject')
const GAME_SETTINGS = require('../../settings')

class DynamicObject extends GameObject{
	
	constructor(name){

		super(name)

		this._speed = { x: 0, y: 0 }
		this._acceleration = { x: 0, y: 0 }
	}

	update(deltaTime){

		const FORCE_FACTOR = 1.0
		const MILLISECONDS_PER_SECOND = 1000
		const DECELERATION = 0.02;

		this._position.x += this._speed.x
		this._position.y += this._speed.y

		// this._speed.x = (this._speed.x + this._acceleration.x) * FORCE_FACTOR + this._speed.x * (1.0 - FORCE_FACTOR)
		// this._speed.y = (this._speed.x + this._acceleration.y) * FORCE_FACTOR + this._speed.y * (1.0 - FORCE_FACTOR)

		this._speed.x += this._acceleration.x
		this._speed.y += this._acceleration.y

		this._speed.x = this._speed.x * (1.0 - DECELERATION) + this._acceleration.x
		this._speed.y = this._speed.y * (1.0 - DECELERATION) + this._acceleration.y

		// this._acceleration.x *= (1.0 - FORCE_FALL_PER_SECOND) * (deltaTime / MILLISECONDS_PER_SECOND)
		// this._acceleration.y *= (1.0 - FORCE_FALL_PER_SECOND) * (deltaTime / MILLISECONDS_PER_SECOND)

		this._acceleration = { x: 0, y: 0 }
	}

	accelerate(factor) {
		this._acceleration.x = Math.cos(this._angle) * factor 
		this._acceleration.y = Math.sin(this._angle) * factor
	}

	getState() {
		return {
			...super.getState(),
			speed: this._speed
		}
	}
}

module.exports = DynamicObject
