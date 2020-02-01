const GAME_SETTINGS = require('../../settings')

class GameObject {
	constructor(name) {
		this._name = name || 'DEFAULT'
		this._position = { x: 0, y: 0 }
		this._size = { width: 0, height: 0 }
		this._angle = 0 // 0π to 2π
	}

	getPosition() {
		return this._position
	}

	setPosition(position) {
		this._position = {
			...this._position,
			...position
		}
	}

	getSize() {
		return this._size
	}

	setSize(size) {
		this._size = {
			...this._size,
			...size
		}
	}

	getAngle() {
		return this._angle
	}

	setAngle(angle) {
		this._angle = {
			...this._angle,
			...angle
		}
	}

	getState() {
		return {
			name: this._name,
			position: this._position,
			size: this._size,
			angle: this._angle
		}
	}

	translate({ translateX, translateY }) {
		this._position.y += translateY || 0
		this._position.x += (translateX / GAME_SETTINGS.SCREEN_RATIO) || 0
	}
}

module.exports = GameObject
