const DynamicObject = require('./DynamicObject')

class MissileObject extends DynamicObject {
    constructor(name) {
        super(name)
        this._damage = 0.0
    }

    getState() {
		return {
			...super.getState(),
			damage: this._damage
		}
	}
}

module.exports = MissileObject