import { lol } from './some_file.js'

console.log('asd', lol);

window

class SimpleGame {

    /** @member {Phaser.Loader} load */

    constructor() {

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 400,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        this.game = new Phaser.Game(config);
    }

    preload() {
        /** @type {Phaser.State} */
        const self = this;

        self.load.image('sky', 'assets/sky.png');
        self.load.image('ground', 'assets/platform.png');
        self.load.image('star', 'assets/star.png');
        self.load.image('bomb', 'assets/bomb.png');
        self.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        /** @type {Phaser.State} */
        const self = this;

        self.add.image(400, 300, 'sky');
        self.add.image(0, 0, 'sky').setOrigin(0, 0);
    }

    update() {
    }
}

window.onload = () => {
    var game = new SimpleGame();
};