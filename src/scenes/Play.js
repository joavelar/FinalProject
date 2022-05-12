class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('lock body', './asset/images/Lock_Body.png');
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    create() {
        //configuration code for audio
        let musicConfig = {
            volume: 0.5,
        }

        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //set pointer x and y positions and its starting position.
        this.pointerX = [130, 193, 255, 314, 372, 430];
        this.pointerY = 325;
        this.pointerPos = 0;
        this.pointer = this.add.rectangle(this.pointerX[this.pointerPos], this.pointerY, 5, 10, 0x767676).setOrigin(0, 0);

        //add lockbody
        this.lockBody = this.add.tileSprite(100, 200, 720, 480, 'lock body').setOrigin(0, 0);


    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyD) && this.pointerPos < this.pointerX.length-1) {
            this.pointerPos ++;
        }
        else if (Phaser.Input.Keyboard.JustDown(keyA) && this.pointerPos > 0) {
            this.pointerPos --;
        }
        this.pointer.x = this.pointerX[this.pointerPos];
    }
}