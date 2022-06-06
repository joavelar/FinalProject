class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('lock body', './asset/images/Lock_Body.png');
        this.load.image('lock pick', './asset/images/Lock_Pick.png');
        this.load.image('lock cover', './asset/images/Lock_Cover.png');
        this.load.image('key pin 1', './asset/images/Key_Pin_1.png');
        this.load.image('driver pin 1', './asset/images/Driver_Pin_1.png');
        this.load.image('timer', './asset/images/Timer.png');
        this.load.image('player', './asset/images/Player.png')
        this.load.image('customer 1', './asset/images/Level_1_person.png')
        this.load.image('customer 2', './asset/images/Level_2_person.png')
        this.load.image('customer 3', './asset/images/Level_3_person.png')
        this.load.image('customer 4', './asset/images/Level_4_person.png')
        this.load.image('customer 5', './asset/images/Level_5_person.png')
        this.load.image('customer 6', './asset/images/Level_6_person.png')
        this.load.spritesheet('emotes', 'asset/images/Pin_Emotes_Spritesheet.png', { frameWidth: 24, frameHeight: 24 });
        this.load.image('customer bubble', './asset/images/Flipped_Small_Bubble.png')
        this.load.image('player bubble', './asset/images/Small_Bubble.png')
        this.load.image('sky', './asset/images/Level_background.png')
        this.load.image('c1', './asset/images/Cloud_1.png')
        this.load.image('c2', './asset/images/Cloud_2.png')
        this.load.image('spark','./asset/images/FX/spark.png')
    }
    create() {
        //key for Menu scene
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //lose condition
        this.loseCondition = false;
        //BG 
        this.sky = this.add.tileSprite(0,0,720,480,'sky').setOrigin(0,0);
        this.sky.depth = -1;
        this.cloud2 = this.add.tileSprite(0,-200,720,480,'c2').setOrigin(0,0);
        this.cloud1 = this.add.tileSprite(0,-125,720,480,'c1').setOrigin(0,0);

        //setting up particle emitters
        let sparkemitter = this.add.particles('spark').setDepth(2).createEmitter({
            x: 400,
            y: 1000,
            speed: {min: -600, max: 700},
            angle: {min: 0, max: 360},
            scale: {start: 0.5, end: 0},
            blendMode: 'SCREEN',
            lifespan: 500,
            gravityY: 700
        })


        console.log(window.currentLevel);

        //game over flag
        this.gameOver = false;
        this.win = false;

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
        if(window.currentLevel > 0)
        {
            this.timerLength = 60 - window.currentLevel*10;
            this.memorizeText = this.add.text(game.config.width/3, borderUISize*5 - borderPadding, "Memorize the Symbols");
            this.preClock = this.time.delayedCall(8000, () => {
                this.levelStart = true; // the lock has been covered and the level timer will begin
                this.gameLive = true;
                this.memorizeText.y = 1000;

                // show the correct order of symbols
                this.customerBubble = this.add.tileSprite(190, 280, 360, 90, 'customer bubble').setOrigin(0, 0);
                this.emoteSpeechA = this.add.image(240, 300, 'emotes', this.levelEmotes[this.pinOrder[0]]).setOrigin(0, 0);
                this.emoteSpeechB = this.add.image(290, 300, 'emotes', this.levelEmotes[this.pinOrder[1]]).setOrigin(0, 0);
                this.emoteSpeechC = this.add.image(340, 300, 'emotes', this.levelEmotes[this.pinOrder[2]]).setOrigin(0, 0);
                this.emoteSpeechD = this.add.image(390, 300, 'emotes', this.levelEmotes[this.pinOrder[3]]).setOrigin(0, 0);
                this.emoteSpeechE = this.add.image(440, 300, 'emotes', this.levelEmotes[this.pinOrder[4]]).setOrigin(0, 0);
                this.emoteSpeechF = this.add.image(490, 300, 'emotes', this.levelEmotes[this.pinOrder[5]]).setOrigin(0, 0);

                // create the player's order of symbols
                this.playerBubble = this.add.tileSprite(100, 220, 360, 90, 'player bubble').setOrigin(0, 0);
                this.emotePlayerA = this.add.image(140, 1000, 'emotes', this.levelEmotes[this.pinOrder[0]]).setOrigin(0, 0);
                this.emotePlayerB = this.add.image(190, 1000, 'emotes', this.levelEmotes[this.pinOrder[1]]).setOrigin(0, 0);
                this.emotePlayerC = this.add.image(240, 1000, 'emotes', this.levelEmotes[this.pinOrder[2]]).setOrigin(0, 0);
                this.emotePlayerD = this.add.image(290, 1000, 'emotes', this.levelEmotes[this.pinOrder[3]]).setOrigin(0, 0);
                this.emotePlayerE = this.add.image(340, 1000, 'emotes', this.levelEmotes[this.pinOrder[4]]).setOrigin(0, 0);
                this.emotePlayerF = this.add.image(390, 1000, 'emotes', this.levelEmotes[this.pinOrder[5]]).setOrigin(0, 0);
                this.emotePlayers = [this.emotePlayerA, this.emotePlayerB, this.emotePlayerC, this.emotePlayerD, this.emotePlayerE, this.emotePlayerF]

                this.clock = this.time.delayedCall(this.timerLength * 1000, () => { //setting up the clock
                    this.gameOver = true; // once timer runs it means game over
                    this.gameLive = false;
                    this.loseCondition = true; //this will only happen if and only if the timer runs out which is the only lose condition
                    this.musicLoop.stop();
                    this.add.text(game.config.width/3, borderUISize*5 - borderPadding, "You ran out of time, you lose.");
                    this.add.text(game.config.width/3, borderUISize*5 - borderPadding+15, "Press M to go to menu, or R to restart level");
                }, null, this)
            }, null, this)
        }

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
        //this.pointer = this.add.rectangle(this.pointerX[this.pointerPos], this.pointerY, 5, 10, 0xFF0000).setOrigin(0, 0);
        this.pointer = this.add.tileSprite(this.pointerX[this.pointerPos]-20, this.pointerY, 720, 120, 'lock pick').setOrigin(0, 0);

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

        //Adding the player and customer sprite
        this.customers = ["customer 1", "customer 2", "customer 3", "customer 4", "customer 5", "customer 6"]
        this.player = this.add.tileSprite(0,20,game.config.width, game.config.height, "player").setOrigin(0,0);
        this.customer = this.add.tileSprite(0,20,game.config.width, game.config.height, this.customers[window.currentLevel]).setOrigin(0,0);
        this.player.depth = -1
        this.customer.depth = -1

        //Add Lock Cover
        this.lockCover = this.add.tileSprite(100, 1000, 720, 480, 'lock cover').setOrigin(0, 0);

        //wrong answer counter
        this.wrong = 0;

        //tutorial setup
        if(window.currentLevel == 0){
            this.player.x -=300;
            this.customer.x+=300;
            this.lockGroup = [this.lockBody, this.pointer,
                              this.keyPinA, this.keyPinB, this.keyPinC, this.keyPinD, this.keyPinE, this.keyPinF,
                              this.driverPinA, this.driverPinB, this.driverPinC, this.driverPinD, this.driverPinE, this.driverPinF,
                              this.emotePinA, this.emotePinB, this.emotePinC, this.emotePinD, this.emotePinE, this.emotePinF];
            
            _.each(this.lockGroup, function(entry) {
                entry.y -= 300;
            })
            this.timerGraphic.y -= 100;
            this.timerLeft.y -= 100;
            this.tutorialStep = 0;
        }

        //play music
        this.musicLoop = this.sound.add('music');
        this.musicLoop.loop = true;
        this.musicLoop.play();

        //game is live boolean
        this.gameLive = false;
        this.correctPin = false;

        //play particle effects
        this.input.keyboard.on('keydown-W', function (pointer){
            console.log(this.scene.gameLive)
            if(this.scene.gameLive == true){
                sparkemitter.setPosition(this.scene.pointerX[this.scene.pointerPos],this.scene.pointerY);
                sparkemitter.explode(5);
            }
            if(this.scene.gameLive == true && this.scene.correctPin == true){
                sparkemitter.setPosition(this.scene.pointerX[this.scene.pointerPos],this.scene.pointerY);
                sparkemitter.explode(30);
            };
        })
    }

    update() {
        if(!this.loseCondition){
            this.cloud1.tilePositionX += 1.5;
            this.cloud2.tilePositionX += 0.5;

            //stop if gameOver is true or level hasn't started
            if(!this.levelStart && window.currentLevel > 0){

                //keep timer frozen
                this.timerLeft.text = this.timerLength;

                //move lock cover towards lock
                this.lockCover.y = this.yOffset+Math.round((this.preClock.delay-this.preClock.elapsed)/10);

            //tutorial sequence
            }else if (!this.levelStart && window.currentLevel == 0) {

                //0
                if(this.tutorialStep == 0) {
                    this.playerClock = this.time.delayedCall(1000, () => {
                        this.tutorialStep += 1;
                    }, null, this)
                    this.tutorialStep += 1;
                }

                //1
                else if (this.tutorialStep == 1) {
                    this.player.x = -((this.playerClock.delay-this.playerClock.elapsed)/10)*3;
                }

                //2
                else if(this.tutorialStep == 2) {
                    this.tutorialText = [this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "Time to psych myself up for the sales day."),
                                        this.add.text(game.config.width/8, borderUISize*6 - borderPadding, "I'll practice my pitch in front of the mirror."),
                                        this.add.text(game.config.width/4, borderUISize*8 - borderPadding, "Press W to continue")];
                    this.tutorialStep += 1;
                }

                //3
                else if(this.tutorialStep == 3 && Phaser.Input.Keyboard.JustDown(keyW)){
                    _.each(this.tutorialText, function(entry) {
                        entry.y = 1000;
                    })
                    this.customerClock = this.time.delayedCall(1000, () => {
                        this.tutorialStep += 1;
                    }, null, this)
                    this.tutorialStep += 1;
                }

                //4
                else if (this.tutorialStep == 4) {
                    this.customer.x = ((this.customerClock.delay-this.customerClock.elapsed)/10)*3;
                }

                //5
                else if (this.tutorialStep == 5) {
                    this.tutorialText = [this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "This is the customer."),
                                        this.add.text(game.config.width/8, borderUISize*6 - borderPadding, "If I tell them what they want to hear, they'll buy my product."),
                                        this.add.text(game.config.width/4, borderUISize*8 - borderPadding, "Press W to continue")];
                    this.tutorialStep += 1;
                }

                //6
                else if(this.tutorialStep == 6 && Phaser.Input.Keyboard.JustDown(keyW)){
                    _.each(this.tutorialText, function(entry) {
                        entry.y = 1000;
                    })
                    this.lockClock = this.time.delayedCall(1500, () => {
                        this.tutorialStep += 1;
                    }, null, this)
                    this.lastElapsed = 0;
                    this.tutorialStep += 1;
                }

                //7
                else if (this.tutorialStep == 7) {
                    window.lockYdrift = (this.lockClock.elapsed - this.lastElapsed)/5;
                    _.each(this.lockGroup, function(entry) {
                        entry.y += window.lockYdrift;
                    })
                    this.lastElapsed = this.lockClock.elapsed;
                }

                //8
                else if (this.tutorialStep == 8) {
                    this.tutorialText = [this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "This is the CONVO LOCK. Each pin represents a different topic."),
                                        this.add.text(game.config.width/8, borderUISize*6 - borderPadding, "Once I press the pins in the right order, I'll close the sale."),
                                        this.add.text(game.config.width/4, borderUISize*8 - borderPadding, "Press W to continue")];
                    this.tutorialStep += 1;
                }

                //9
                else if(this.tutorialStep == 9 && Phaser.Input.Keyboard.JustDown(keyW)){
                    _.each(this.tutorialText, function(entry) {
                        entry.y = 1000;
                    })
                    
                    // show the correct order of symbols
                    this.customerBubble = this.add.tileSprite(190, 280, 360, 90, 'customer bubble').setOrigin(0, 0);
                    this.emoteSpeechA = this.add.image(240, 300, 'emotes', this.levelEmotes[this.pinOrder[0]]).setOrigin(0, 0);
                    this.emoteSpeechB = this.add.image(290, 300, 'emotes', this.levelEmotes[this.pinOrder[1]]).setOrigin(0, 0);
                    this.emoteSpeechC = this.add.image(340, 300, 'emotes', this.levelEmotes[this.pinOrder[2]]).setOrigin(0, 0);
                    this.emoteSpeechD = this.add.image(390, 300, 'emotes', this.levelEmotes[this.pinOrder[3]]).setOrigin(0, 0);
                    this.emoteSpeechE = this.add.image(440, 300, 'emotes', this.levelEmotes[this.pinOrder[4]]).setOrigin(0, 0);
                    this.emoteSpeechF = this.add.image(490, 300, 'emotes', this.levelEmotes[this.pinOrder[5]]).setOrigin(0, 0);

                    // create the player's order of symbols
                    this.playerBubble = this.add.tileSprite(100, 220, 360, 90, 'player bubble').setOrigin(0, 0);
                    this.emotePlayerA = this.add.image(140, 1000, 'emotes', this.levelEmotes[this.pinOrder[0]]).setOrigin(0, 0);
                    this.emotePlayerB = this.add.image(190, 1000, 'emotes', this.levelEmotes[this.pinOrder[1]]).setOrigin(0, 0);
                    this.emotePlayerC = this.add.image(240, 1000, 'emotes', this.levelEmotes[this.pinOrder[2]]).setOrigin(0, 0);
                    this.emotePlayerD = this.add.image(290, 1000, 'emotes', this.levelEmotes[this.pinOrder[3]]).setOrigin(0, 0);
                    this.emotePlayerE = this.add.image(340, 1000, 'emotes', this.levelEmotes[this.pinOrder[4]]).setOrigin(0, 0);
                    this.emotePlayerF = this.add.image(390, 1000, 'emotes', this.levelEmotes[this.pinOrder[5]]).setOrigin(0, 0);
                    this.emotePlayers = [this.emotePlayerA, this.emotePlayerB, this.emotePlayerC, this.emotePlayerD, this.emotePlayerE, this.emotePlayerF]
                    
                    this.tutorialText = [this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "The customer tells me what order I need to press the pins in."),
                                        this.add.text(game.config.width/8, borderUISize*6 - borderPadding, "Use A and D to move the selector, and W to press the pin.")];
                    
                    this.levelStart = true;
                    this.gameLive = true;
                    this.tutorialStep += 1;
                }

            } else if (!this.gameOver){

                if(window.currentLevel > 0)
                {
                    //run down the timer
                    this.timerLeft.text = Math.round((this.clock.delay-this.clock.elapsed)/1000);
                }

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
                this.pointer.x = this.pointerX[this.pointerPos]-20;

                
                //bump pin
                if(Phaser.Input.Keyboard.JustDown(keyW)) {
                    this.keyPins[this.pointerPos].y = this.keyPinY[this.pointerPos]-16;
                    this.emotePins[this.pointerPos].y = this.driverPinY[this.pointerPos]-14;
                    this.driverPins[this.pointerPos].y = this.driverPinY[this.pointerPos]-16;
                    this.pointer.y = this.pointerY - 30;
                    //set the pin if it's the right one
                    if (this.pointerPos == this.pinOrder[this.currentStep]) {
                        this.correctPin = true;
                        this.sound.play('sfx_TrueClick');
                        console.log("pin set!")
                        this.setPins[this.pointerPos] = true;
                        this.emotePlayers[this.currentStep].y = 240;
                        this.currentStep ++;
                        console.log(this.gameOver);
                        //reset wrong counter
                        this.wrong = 0;

                        //win the game
                        if(this.currentStep == 6) {
                            this.gameOver = true; //  for now we want it to end here
                            this.win = true;
                            console.log(this.gameOver);
                            this.pointer.y = 1000; //not sure why this doesn't disappear but this fixes it
                            //this.create();
                            this.scene.start("levelWin");
                        }
                    }else{
                        this.sound.play('sfx_LoosePin');
                        //add counter
                        this.wrong += 1;
                        this.correctPin = false;
                        console.log("wrong: ",this.wrong);
                        //check counter is 2 or 0 if so then drop previous pin if any
                        if((this.currentStep>0) && this.wrong == 2){
                            console.log("wrong: ",this.wrong);
                            this.wrong = 0;
                            console.log("wrong: ",this.wrong);
                            this.currentStep -= 1;
                            let n = this.pinOrder[this.currentStep];
                            this.setPins[n] = false;
                            this.emotePlayers[this.currentStep].y = 1000
                        }
                    
                    }

                }

                //pin drop
                for(let i = 0; i < this.keyPins.length; i++)
                {
                    if(this.pointer.y <= 150){
                        this.pointer.y += .75;
                    }
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
                if(window.currentLevel == 0){
                    //post-level tutorial

                    //10
                    if(this.tutorialStep == 10) {
                        _.each(this.tutorialText, function(entry) {
                            entry.y = 1000;
                        })
                        this.tutorialText = [this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "Good job. Later levels will have 3 things to watch out for."),
                                            this.add.text(game.config.width/4, borderUISize*6 - borderPadding, "Press W to continue")];
                        this.tutorialStep += 1;
                    }
                    
                    //11
                    else if(this.tutorialStep == 11 && Phaser.Input.Keyboard.JustDown(keyW)){
                        _.each(this.tutorialText, function(entry) {
                            entry.y = 1000;
                        })
                        this.exampleClock = this.time.delayedCall(4000, () => {
                            this.tutorialStep += 1;
                        }, null, this)
                        this.tutorialText = this.add.text(game.config.width/8, borderUISize*5 - borderPadding, "1. The lock will be covered in 8 seconds after the level begins.");
                        this.gameLive = false;
                        this.lockCover.depth = 1000;
                        this.tutorialStep += 1;
                    }

                    //12
                    else if(this.tutorialStep == 12) {
                        this.lockCover.y = this.yOffset+Math.round((this.exampleClock.delay-this.exampleClock.elapsed)/10)*2;
                    }

                    //13
                    else if(this.tutorialStep == 13){
                        this.pinClock = this.time.delayedCall(4000, () => {
                            this.tutorialStep += 1;
                        }, null, this)
                        this.tutorialText = this.add.text(game.config.width/8, borderUISize*6 - borderPadding, "2. You'll lose progress is if you incorrectly guess too often.");
                        this.tutorialStep += 1;
                    }

                    //14
                    else if(this.tutorialStep == 14) {
                        if(this.pinClock.elapsed > 1000){ //1001 - 3999   0001 - 2999    0.002 - 5.998
                            this.tutorialEmoteEraser = 5-Math.floor((this.pinClock.elapsed-1000)/500);
                            this.emotePlayers[this.tutorialEmoteEraser].y = 1000;
                        }
                    }
                    
                    //15
                    else if(this.tutorialStep == 15){
                        this.timerClock = this.time.delayedCall(4000, () => {
                            this.tutorialStep += 1;
                        }, null, this)
                        this.tutorialText = this.add.text(game.config.width/8, borderUISize*7 - borderPadding, "3. Each level will have a time limit.");
                        this.playerBubble.y = 1000;
                        this.tutorialStep += 1;
                    }

                    //16
                    else if(this.tutorialStep == 16) {
                        this.timerGraphic.y = borderUISize - 188-100+Math.min(100,this.timerClock.elapsed/10);
                        this.timerLeft.y = borderUISize - borderPadding-100+Math.min(100,this.timerClock.elapsed/10);
                        this.timerLeft.text = 56+Math.round((this.timerClock.delay-this.timerClock.elapsed)/1000);
                    }

                    //17
                    else if(this.tutorialStep == 17) {
                        this.emoteSpeechs = [this.emoteSpeechA, this.emoteSpeechB, this.emoteSpeechC, this.emoteSpeechD, this.emoteSpeechE, this.emoteSpeechF];
                        _.each(this.emoteSpeechs, function(entry) {
                            entry.y = 1000;
                        })
                        this.tutorialText = this.add.text(game.config.width/4, borderUISize*9 - borderPadding, "Press W to go to the next level");
                        this.customerBubble.y = 1000;
                        this.tutorialStep += 1;
                    }

                    //18
                    else if(this.tutorialStep == 18 && Phaser.Input.Keyboard.JustDown(keyW)){
                        window.currentLevel += 1;
                        this.musicLoop.stop();
                        this.scene.start("playScene");
                    }                


                }
                else
                {
                    this.musicLoop.stop();
                    if(this.win){
                        window.currentLevel += 1;
                    }
                    if(window.currentLevel == 6) {
                        this.scene.start("menuScene");
                    }
                    else
                    {
                        this.scene.start("playScene");
                    }
                }
            }
        }else{
            this.scene.start("levelLoss");
            // if(Phaser.Input.Keyboard.JustDown(keyM)){
            //     this.scene.start("menuScene");
            // }
            // if(Phaser.Input.Keyboard.JustDown(keyR)){
            //     this.loseCondition = false;
            // }
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