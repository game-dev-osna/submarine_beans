const GAME_SETTINGS = require('../../settings')

class GameObject {
	constructor(name) {
		this._name = name || 'DEFAULT'
		this._position = { x: 50, y: 50 }
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
		this._angle = angle
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

	update(deltaTime) {
		
	}

	rotate( radians ) {
		this._angle += (radians || 0)
		this._angle = this._angle % (Math.PI * 2)

		while(this._angle < 0.0)
		{
			this._angle += Math.PI * 2;
		}
	}

	move( distance ) {
		this.translate({
			translateX: distance * Math.cos(this._angle),
			translateY: distance * Math.sin(this._angle)
		})
	}
}

module.exports = GameObject
