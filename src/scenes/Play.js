class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('lock body', './asset/images/Lock_Body.png');
        this.load.image('key pin 1', './asset/images/Key_Pin_1.png');
        this.load.image('driver pin 1', './asset/images/Driver_Pin_1.png');
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
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //set pointer x and y positions and its starting position.
        this.pointerX = [130, 193, 255, 314, 372, 430];
        this.pointerY = 325;
        this.pointerPos = 0;
        this.pointer = this.add.rectangle(this.pointerX[this.pointerPos], this.pointerY, 5, 10, 0x767676).setOrigin(0, 0);

        //add lock body and pins
        this.lockBody = this.add.tileSprite(100, 200, 720, 480, 'lock body').setOrigin(0, 0);

        this.keyPinA = this.add.tileSprite(117, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinB = this.add.tileSprite(180, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinC = this.add.tileSprite(242, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinD = this.add.tileSprite(301, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinE = this.add.tileSprite(359, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinF = this.add.tileSprite(417, 253, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPins = [this.keyPinA, this.keyPinB, this.keyPinC, this.keyPinD, this.keyPinE, this.keyPinF];


        this.driverPinA = this.add.tileSprite(117, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinB = this.add.tileSprite(180, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinC = this.add.tileSprite(242, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinD = this.add.tileSprite(301, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinE = this.add.tileSprite(359, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinF = this.add.tileSprite(417, 221, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPins = [this.driverPinA, this.driverPinB, this.driverPinC, this.driverPinD, this.driverPinE, this.driverPinF];

        //track the default y positions of each pin
        this.keyPinY = [this.keyPins[0].y, this.keyPins[1].y, this.keyPins[2].y, this.keyPins[3].y, this.keyPins[4].y, this.keyPins[5].y];
        this.driverPinY = [this.driverPins[0].y, this.driverPins[1].y, this.driverPins[2].y, this.driverPins[3].y, this.driverPins[4].y, this.driverPins[5].y];
    }

    update() {
        //move pointer
        if(Phaser.Input.Keyboard.JustDown(keyD) && this.pointerPos < this.pointerX.length-1) {
            this.pointerPos ++;
        }
        else if (Phaser.Input.Keyboard.JustDown(keyA) && this.pointerPos > 0) {
            this.pointerPos --;
        }
        this.pointer.x = this.pointerX[this.pointerPos];

        //bump pin
        if(Phaser.Input.Keyboard.JustDown(keyW)) {
            this.keyPins[this.pointerPos].y = this.keyPinY[this.pointerPos]-16;
            this.driverPins[this.pointerPos].y = this.driverPinY[this.pointerPos]-16;
        }

        //pin drop
        for(let i = 0; i < this.keyPins.length; i++)
        {
            if(this.keyPins[i].y < this.keyPinY[i]) {
                this.keyPins[i].y += .75;
            }
            if(this.driverPins[i].y < this.driverPinY[i]) {
                this.driverPins[i].y += .75;
            }
        }
    }
}