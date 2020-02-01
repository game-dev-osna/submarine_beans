class GameObject {
	constructor(name) {
		this._position = { x: 0, y: 0 }
		this._name = name || 'DEFAULT'
	}

	getPosition() {
		return this._position
	}

	setPosition(position) {
		this._position = {
			...this._position,
			...position
		}
		console.log(this._position)
	}
}

module.exports = GameObject
