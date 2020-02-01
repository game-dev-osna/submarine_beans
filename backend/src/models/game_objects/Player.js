const DynamicObject = require('./DynamicObject')

class Player extends DynamicObject {

	constructor(name) {
		super(name)

		this._inputs = {
			up: false,
			down: false,
			left: false,
			right: false
		}
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
