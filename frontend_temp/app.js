const socket = new WebSocket(`ws://${ window.location.hostname }:8080`)
const canvasElement = document.querySelector('canvas')
const context = canvasElement.getContext('2d')

const localRatio = window.innerWidth / window.innerHeight
const remoteRatio = 16 / 9

const dimensions = {
	width: Math.ceil(localRatio < remoteRatio? window.innerWidth : window.innerHeight * remoteRatio),
	height: Math.ceil(localRatio < remoteRatio? window.innerWidth / remoteRatio : window.innerHeight)
}

let lastInputs = {
	up: false,
	down: false,
	left: false,
	right: false
}

let inputs = {
	up: false,
	down: false,
	left: false,
	right: false
}

canvasElement.style.width = `${ dimensions.width }px`
canvasElement.style.height = `${ dimensions.height }px`
canvasElement.width = dimensions.width
canvasElement.height = dimensions.height

socket.onopen =  () => {
	document.querySelector('.button-group > button:nth-child(1)').addEventListener('click', joinGame)
	document.querySelector('.button-group > button:nth-child(2)').addEventListener('click', startGame)
	document.querySelector('.button-group > button:nth-child(3)').addEventListener('click', stopGame)
	window.addEventListener('keydown', setInputOnKeyDown)
	window.addEventListener('keyup', setInputOnKeyUp)
}

const setText = (content) => {
	document.querySelector('body > div > pre').innerHTML = JSON.stringify(content, null, 2)
}

socket.onmessage = (event) => {
  try {
	const message = JSON.parse(event.data)
	if(message.type == 'state') {
		setText(message.payload)
		setState(message.payload)
	}
  } catch(error) {
	  console.error(error)
  }
}

const sendMessage = (message) => {
	if(!socket)
		return
	socket.send(JSON.stringify(message))
}


const joinGame = () => {
	console.log('Try to join game.')
	const message = {
		type: 'general',
		payload: {
			command: 'join'
		}
	}

	sendMessage(message)
}


const startGame = () => {
	console.log('Try to start game.')
	const message = {
		type: 'general',
		payload: {
			command: 'start'
		}
	}

	sendMessage(message)
}

const stopGame = () => {
	console.log('Try to stop game.')
	const message = {
		type: 'general',
		payload: {
			command: 'stop'
		}
	}

	sendMessage(message)
}

const isSameInput = (lastInput, newInput) => {
	if(	lastInput.up === newInput.up &&
		lastInput.down === newInput.down &&
		lastInput.right === newInput.right &&
		lastInput.left === newInput.left) {
			return true
		}
	return false
}

const processInputs = () => {

	if(isSameInput(lastInputs, inputs))
		return

	lastInputs = {...inputs}

	const message = {
		type: 'input',
		payload: {
			...inputs
		}
	}

	sendMessage(message)
}


const setInputOnKeyDown = (event) => {
	switch (event.keyCode) {
		case 38:
			inputs.up = true
			break
		case 39:
			inputs.right = true
			break
		case 40:
			inputs.down = true
			break
		case 37:
			inputs.left = true
			break
		default:
			return
	}
	processInputs()
}

const setInputOnKeyUp = (event) => {
	switch (event.keyCode) {
		case 38:
			inputs.up = false
			break
		case 39:
			inputs.right = false
			break
		case 40:
			inputs.down = false
			break
		case 37:
			inputs.left = false
			break
		default:
			return
	}
	processInputs()
}

const calculatePercentToPixel = ({ x: xPercent , y: yPercent }) => {
	return {
		// 1200*(50/100)
		x: (dimensions.width * (xPercent / 100.0)) || 0,
		y: (dimensions.height * (yPercent / 100.0)) || 0
	}
}


//#############################
// 			 LOOP
//#############################

let lastState = null
let state = null
let lastFrameDate = new Date()

const setState = (remoteState) => {
	lastState = state
	state = remoteState
}

const loop = () => {
	window.requestAnimationFrame(loop); 

	if(state && lastState) {
		// Clear last frame
		context.clearRect(0,0,canvasElement.width, canvasElement.height)

		// Draw server fps
		// @ts-ignore
		const timeDifferenceServer = new Date(state.meta.serverTime) - new Date(lastState.meta.serverTime)
		const serverFps = Math.round(1000 / timeDifferenceServer)
		
		const currentDate = new Date()
		// @ts-ignore
		const timeDifferenceClient = currentDate - lastFrameDate
		const clientFps = Math.round(1000 / timeDifferenceClient)
		lastFrameDate = currentDate 

		context.font = "20px Arial"
		context.fillText(`Players: ${ state.meta.amountOfPlayers } C-FPS: ${ clientFps } S-FPS: ${ serverFps }`, canvasElement.width - 350, 50)

		drawPlayers()
	}
}

loop()

const drawPlayers = () => {
	state.players.forEach(player => {
		const playerPixelPosition = calculatePercentToPixel(player.position)
		context.beginPath()
		context.arc(playerPixelPosition.x, playerPixelPosition.y, 20, 0.2, 2 * Math.PI)
		context.stroke()
	})
}