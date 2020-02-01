const DynamicObject = require('./DynamicObject')

class Player extends DynamicObject {

	constructor(name) {
		super(name)

		this._lastInteractionDate = new Date()
		this._color = ''
		this._inputs = {
			up: false,
			down: false,
			left: false,
			right: false,
			s_key: false
		}
	}

	getLastInteractionDate() {
		return this._lastInteractionDate
	}

	setLastInteractionDate(lastInteractionDate) {
		this._lastInteractionDate = lastInteractionDate
	}
	
	getColor() {
		return this._color
	}

	getInputs() {
		return this._inputs
	}

	setInputs(inputs) {
		this._inputs = {
			...this._inputs, 
			...inputs
		}
	}

	setColor(color) {
		this._color = color
	}

	getState() {
		return {
			...super.getState(),
			color: this._color
		}
	}
}	

module.exports = Player
