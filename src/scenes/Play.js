class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('lock body', './asset/images/Lock_Body.png');
        this.load.image('lock cover', './asset/images/Lock_Cover.png');
        this.load.image('key pin 1', './asset/images/Key_Pin_1.png');
        this.load.image('driver pin 1', './asset/images/Driver_Pin_1.png');
        this.load.image('timer', './asset/images/Timer.png');
        this.load.image('People', './asset/images/ThePeople.png')
        this.load.spritesheet('emotes', 'asset/images/Pin_Emotes_Spritesheet.png', { frameWidth: 24, frameHeight: 24 });
        this.load.image('customer bubble', './asset/images/flipped_small_bubble.png')
        this.load.image('player bubble', './asset/images/small_bubble.png')
    }
    create() {
        //game over flag
        this.gameOver = false;

        //configuration code for audio
        let musicConfig = {
            volume: 0.5,
        }

        //config the timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#808080',
            align: 'center',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120,
        }
        //add timer overlay
        this.timerGraphic = this.add.tileSprite(game.config.width-315, borderUISize - 188, 382, 382, 'timer').setOrigin(0, 0);
        this.timerGraphic.depth = 1

        //adding text to timer
        this.timerLeft = this.add.text(game.config.width-180, borderUISize - borderPadding, this.gameTimer, timerConfig);
        
        //setting up pre-level delay before lock is covered
        this.levelStart = false;
        this.timerLength = 60;
        this.memorizeText = this.add.text(game.config.width/3, borderUISize*5 - borderPadding, "Memorize the Symbols");
        this.preClock = this.time.delayedCall(8000, () => {
            this.levelStart = true; // the lock has been covered and the level timer will begin
            this.memorizeText.y = 1000;

            // show the correct order of symbols
            this.playerBubble = this.add.tileSprite(100, 220, 360, 90, 'player bubble').setOrigin(0, 0);
            this.customerBubble = this.add.tileSprite(190, 280, 360, 90, 'customer bubble').setOrigin(0, 0);
            this.emoteSpeechA = this.add.image(240, 300, 'emotes', this.levelEmotes[this.pinOrder[0]]).setOrigin(0, 0);
            this.emoteSpeechB = this.add.image(290, 300, 'emotes', this.levelEmotes[this.pinOrder[1]]).setOrigin(0, 0);
            this.emoteSpeechC = this.add.image(340, 300, 'emotes', this.levelEmotes[this.pinOrder[2]]).setOrigin(0, 0);
            this.emoteSpeechD = this.add.image(390, 300, 'emotes', this.levelEmotes[this.pinOrder[3]]).setOrigin(0, 0);
            this.emoteSpeechE = this.add.image(440, 300, 'emotes', this.levelEmotes[this.pinOrder[4]]).setOrigin(0, 0);
            this.emoteSpeechF = this.add.image(490, 300, 'emotes', this.levelEmotes[this.pinOrder[5]]).setOrigin(0, 0);

            this.clock = this.time.delayedCall(this.timerLength * 1000, () => { //setting up the clock
                this.gameOver = true; // once timer runs it means game over
            }, null, this)
        }, null, this)

        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //x and y offset of the whole lock, pins, lockpick setup
        this.xOffset = 0;
        this.yOffset = 20;

        //set pointer x and y positions and its starting position.
        this.pointerX = [130, 193, 255, 314, 372, 430];
        this.pointerY = 130+this.yOffset;
        this.pointerPos = 0;
        // old pointer color was 0x767676, briefly changed it to red for visibility
        this.pointer = this.add.rectangle(this.pointerX[this.pointerPos], this.pointerY, 5, 10, 0xFF0000).setOrigin(0, 0);

        //add lock body and pins
        this.lockBody = this.add.tileSprite(100, 0+this.yOffset, 720, 480, 'lock body').setOrigin(0, 0);

        this.keyPinA = this.add.tileSprite(117, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinB = this.add.tileSprite(180, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinC = this.add.tileSprite(242, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinD = this.add.tileSprite(301, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinE = this.add.tileSprite(359, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPinF = this.add.tileSprite(417, 53+this.yOffset, 32, 64, 'key pin 1').setOrigin(0, 0);
        this.keyPins = [this.keyPinA, this.keyPinB, this.keyPinC, this.keyPinD, this.keyPinE, this.keyPinF];


        this.driverPinA = this.add.tileSprite(117, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinB = this.add.tileSprite(180, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinC = this.add.tileSprite(242, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinD = this.add.tileSprite(301, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinE = this.add.tileSprite(359, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPinF = this.add.tileSprite(417, 21+this.yOffset, 32, 32, 'driver pin 1').setOrigin(0, 0);
        this.driverPins = [this.driverPinA, this.driverPinB, this.driverPinC, this.driverPinD, this.driverPinE, this.driverPinF];

        //random pin emotes
        this.emoteList = [0,1,2,3,4,5,6,7,8,9,10,11];
        this.levelEmotes = this.shuffle(this.emoteList);

        this.emotePinA = this.add.image(121, 23+this.yOffset, 'emotes', this.levelEmotes[0]).setOrigin(0, 0);
        this.emotePinB = this.add.image(184, 23+this.yOffset, 'emotes', this.levelEmotes[1]).setOrigin(0, 0);
        this.emotePinC = this.add.image(246, 23+this.yOffset, 'emotes', this.levelEmotes[2]).setOrigin(0, 0);
        this.emotePinD = this.add.image(305, 23+this.yOffset, 'emotes', this.levelEmotes[3]).setOrigin(0, 0);
        this.emotePinE = this.add.image(363, 23+this.yOffset, 'emotes', this.levelEmotes[4]).setOrigin(0, 0);
        this.emotePinF = this.add.image(421, 23+this.yOffset, 'emotes', this.levelEmotes[5]).setOrigin(0, 0);
        this.emotePins = [this.emotePinA, this.emotePinB, this.emotePinC, this.emotePinD, this.emotePinE, this.emotePinF]

        //track the default y positions of each pin
        this.keyPinY = [this.keyPins[0].y, this.keyPins[1].y, this.keyPins[2].y, this.keyPins[3].y, this.keyPins[4].y, this.keyPins[5].y];
        this.driverPinY = [this.driverPins[0].y, this.driverPins[1].y, this.driverPins[2].y, this.driverPins[3].y, this.driverPins[4].y, this.driverPins[5].y];

        //pin order and tracking how far along you are in completing it and which pins are set
        //randomization is from: https://javascript.info/task/shuffle
        this.pinOrder = [5,4,1,3,2,0];
        for (let i = this.pinOrder.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.pinOrder[i], this.pinOrder[j]] = [this.pinOrder[j], this.pinOrder[i]];
        }
        this.currentStep = 0;
        this.setPins = [false, false, false, false, false, false];

        //Adding the people sprite
        this.people = this.add.tileSprite(0,20,game.config.width, game.config.height, "People").setOrigin(0,0);
        this.people.depth = -1

        //Add Lock Cover
        this.lockCover = this.add.tileSprite(100, 1000, 720, 480, 'lock cover').setOrigin(0, 0);

        //wrong answer counter
        this.wrong = 0;
    }

    update() {
        //stop if gameOver is true or level hasn't started
        if(!this.levelStart){

            //keep timer frozen
            this.timerLeft.text = this.timerLength;

            //move lock cover towards lock
            this.lockCover.y = this.yOffset+Math.round((this.preClock.delay-this.preClock.elapsed)/10)

        } else if (!this.gameOver){

            //run down the timer
            this.timerLeft.text = Math.round((this.clock.delay-this.clock.elapsed)/1000)

            //test
            if(Phaser.Input.Keyboard.JustDown(keyS)) {
                console.log("pointrPos: " + this.pointerPos);
                console.log("currentStep: " + this.currentStep);
                console.log("pinOrder: " +  this.pinOrder);
                console.log("setPins: " + this.setPins);
            }

            //move pointer
            if(Phaser.Input.Keyboard.JustDown(keyD) && this.pointerPos < this.pointerX.length-1) {
                this.sound.play('sfx_Switch');
                this.pointerPos ++;
            }
            else if (Phaser.Input.Keyboard.JustDown(keyA) && this.pointerPos > 0) {
                this.sound.play('sfx_Switch');
                this.pointerPos --;
            }
            this.pointer.x = this.pointerX[this.pointerPos];

        
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
                this.emotePins[this.pointerPos].y = this.driverPinY[this.pointerPos]-14;
                this.driverPins[this.pointerPos].y = this.driverPinY[this.pointerPos]-16;
                //set the pin if it's the right one
                if (this.pointerPos == this.pinOrder[this.currentStep]) {
                    this.sound.play('sfx_TrueClick');
                    console.log("pin set!")
                    this.setPins[this.pointerPos] = true;
                    this.currentStep ++;
                    console.log(this.gameOver);
                    //reset wrong counter
                    this.wrong = 0;

                    //win the game
                    if(this.currentStep == 6) {
                        this.gameOver = true; //  for now we want it to end here
                        console.log(this.gameOver);
                        this.pointer.y = 1000; //not sure why this doesn't disappear but this fixes it
                        //this.create();
                    }
                }else{
                    this.sound.play('sfx_LoosePin');
                    //add counter
                    this.wrong += 1;
                    console.log("wrong: ",this.wrong);
                    //check counter is 2 or 0 if so then drop previous pin if any
                    if((this.currentStep>0) && this.wrong == 2){
                        console.log("wrong: ",this.wrong);
                        this.wrong = 0;
                        console.log("wrong: ",this.wrong);
                        this.currentStep -= 1;
                        let n = this.pinOrder[this.currentStep]; //[5,2,0,4,1,3]
                        this.setPins[n] = false;
                    }
                   
                }
            }

            //pin drop
            for(let i = 0; i < this.keyPins.length; i++)
            {
                if(this.keyPins[i].y < this.keyPinY[i]) {
                    this.keyPins[i].y += .75;
                }
                //driver pin won't drop if it's set
                if(this.driverPins[i].y < this.driverPinY[i] && !this.setPins[i]) {
                    this.driverPins[i].y += .75;
                    this.emotePins[i].y += .75;
                }
            }
        }else{
            this.scene.start("menuScene");
        }

        
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
}