import { lol } from './some_file.js'

console.log('asd', lol);
import 'phaser';

let platforms;

export default class Demo extends Phaser.Scene {

    // Extends: Phaser.Scene

    constructor() {
        super('demo');
        // Phaser.Scene.call(this, config)
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
