const GameObject = require('./GameObject')

class Submarine extends GameObject {
	constructor(name) {
		super(name)

		this._hp = 100
		this._o2 = 100
		this._fuel = 100
	}
}

module.exports = Submarine
