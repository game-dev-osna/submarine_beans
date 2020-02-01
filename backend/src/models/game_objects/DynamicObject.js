
const { any } = require('ramda')
const SAT = require('sat')
const GameObject = require('./GameObject')
const GAME_SETTINGS = require('../../settings')


class DynamicObject extends GameObject {
	
	constructor(name){

		super(name)

		this._speed = { x: 0, y: 0 }
		this._acceleration = { x: 0, y: 0 }
		this._colliding = false;
	}

	update(deltaTime, gameObjects){

		const EPSILON = 0.00001
		const FORCE_FACTOR = 1.0
		const MILLISECONDS_PER_SECOND = 1000
		const DECELERATION = 0.02;

		this._position.x += this._speed.x
		this._position.y += this._speed.y

		// this._speed.x = (this._speed.x + this._acceleration.x) * FORCE_FACTOR + this._speed.x * (1.0 - FORCE_FACTOR)
		// this._speed.y = (this._speed.x + this._acceleration.y) * FORCE_FACTOR + this._speed.y * (1.0 - FORCE_FACTOR)

		this._speed.x += this._acceleration.x
		this._speed.y += this._acceleration.y

		this._speed.x = this._speed.x * (1.0 - DECELERATION) + this._acceleration.x
		this._speed.y = this._speed.y * (1.0 - DECELERATION) + this._acceleration.y

		
		if(Math.abs(this._speed.x) + Math.abs(this._speed.y) < EPSILON) {
			this._speed.x = 0.0
			this._speed.y = 0.0
		}

		this._acceleration = { x: 0, y: 0 }

		this.processBorderCollision();
		this.processCollision(gameObjects);
	}

	getSpeed()
	{
		return this._speed;
	}

	getRectPointsOfCollider()
	{
		const diffX = Math.cos(this._angle) * this._size.width
		const diffY = Math.sin(this._angle) * this._size.height

		const rectPoints = [
			{ x: this._position.x - diffX, y: this._position.y - diffY },
			{ x: this._position.x + diffX, y: this._position.y - diffY },
			{ x: this._position.x - diffX, y: this._position.y + diffY },
			{ x: this._position.x + diffX, y: this._position.y + diffY }
		]

		return rectPoints;
	}

	processCollision(gameObjects){

		const diffX = Math.cos(this._angle) * this._size.width
		const diffY = Math.sin(this._angle) * this._size.height

		const rectPoints = [
			{ x: this._position.x - diffX, y: this._position.y - diffY },
			{ x: this._position.x + diffX, y: this._position.y - diffY },
			{ x: this._position.x - diffX, y: this._position.y + diffY },
			{ x: this._position.x + diffX, y: this._position.y + diffY }
		]

		const polygonPoints = rectPoints.map(rectPoint => new SAT.Vector(rectPoint.x, rectPoint.y))
		const polygon = new SAT.Polygon(new SAT.Vector(), polygonPoints)

		gameObjects.forEach((gameObject) => 
		{
			const otherRectPoints= gameObject.getRectPointsOfCollider(); 
			const otherPolygonPoints = otherRectPoints.map(rectPoint => new SAT.Vector(rectPoint.x, rectPoint.y))
			const otherPolygon = new SAT.Polygon(new SAT.Vector(), otherPolygonPoints)

			if(gameObject instanceof DynamicObject)
			{
				if(SAT.testPolygonPolygon(polygon, otherPolygon) && this != gameObject)
				{
					// console.log("my", polygon, "other", otherPolygon)


					const otherPosition = gameObject.getPosition()
					const otherSpeed = gameObject.getSpeed()
					
					const diffX = otherPosition.x - this._position.x
					const diffY = otherPosition.y - this._position.y

					const absSpeed = Math.sqrt(Math.pow(this._speed.x, 2) + Math.pow(this._speed.y, 2));
					const otherAbsSpeed = Math.sqrt(Math.pow(otherSpeed.x, 2) + Math.pow(otherSpeed.y, 2));

					const avgAbsSpeed = (absSpeed + otherAbsSpeed) / 2

					this._speed.x = -diffX
					this._speed.y =- diffY

					return 
				}
			}
		});
	}

	processBorderCollision(){

		const diffX = Math.cos(this._angle) * this._size.width
		const diffY = Math.sin(this._angle) * this._size.height

		const rectPoints = [
			{ x: this._position.x - diffX, y: this._position.y - diffY },
			{ x: this._position.x + diffX, y: this._position.y - diffY },
			{ x: this._position.x - diffX, y: this._position.y + diffY },
			{ x: this._position.x + diffX, y: this._position.y + diffY }
		]

		const hasCollisionLeft = any((rectPoint) => (rectPoint.x < 0))(rectPoints);
		const hasCollisionRight = any((rectPoint) => (rectPoint.x > 100))(rectPoints);
		const hasCollisionTop = any((rectPoint) => (rectPoint.y < 0))(rectPoints);
		const hasCollisionBottom = any((rectPoint) => (rectPoint.y > 100))(rectPoints);

		if(hasCollisionLeft && this._speed.x < 0.0) this._speed.x *= -1
		if(hasCollisionRight && this._speed.x > 0.0) this._speed.x *= -1
		if(hasCollisionTop && this._speed.y < 0.0) this._speed.y *= -1;
		if(hasCollisionBottom && this._speed.y > 0.0) this._speed.y *= -1;

		this._colliding = any((b) => b)([hasCollisionLeft, hasCollisionRight, hasCollisionTop, hasCollisionBottom]);
	}



	accelerate(factor) {
		this._acceleration.x = Math.cos(this._angle) * factor / GAME_SETTINGS.SCREEN_RATIO
		this._acceleration.y = Math.sin(this._angle) * factor
	}

	getState() {
		return {
			...super.getState(),
			speed: this._speed,
			colliding: this._colliding
		}
	}
}

module.exports = DynamicObject
