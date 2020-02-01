class GameState {
	constructor() {
		this._isCalculating = false
		this._enemies = []
		
	}

	getIsCalculating() {
		return this._isCalculating
	}

	calculate(players) {
		this._isCalculating = true
		console.log('Game is running ...')
		this._isCalculating = false
	}
}

module.exports = GameState
