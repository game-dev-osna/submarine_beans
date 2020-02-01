const DynamicObject = require('./DynamicObject')

class MissileObject extends DynamicObject {
    constructor(name) {
        super(name)
		this._damage = 0.0
		this.setSize({ width: 1.0, height: 0.5 })
    }

    getState() {
		return {
			...super.getState(),
			damage: this._damage
		}
	}
}

module.exports = MissileObject