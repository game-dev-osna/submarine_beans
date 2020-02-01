const GameObject = require('./GameObject')

class Item extends GameObject {
	constructor(name) {
		super(name)
	}

	use(){
		throw Error("Not Implemented Exception")
	}
}

module.exports = Item
