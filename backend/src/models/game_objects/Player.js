const DynamicObject = require('./DynamicObject')

class Player extends DynamicObject {

	constructor(name) {
		super(name)

		this._lastInteractionDate = new Date()
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

	getInputs() {
		return this._inputs
	}

	setInputs(inputs) {
		this._inputs = {
			...this._inputs, 
			...inputs
		}
	}
}	

module.exports = Player
