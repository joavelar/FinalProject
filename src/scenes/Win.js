class Win extends Phaser.Scene {
    constructor() {
        super("levelWin")
    }
    preload(){
        //load image
        this.load.image('offer', './asset/images/lossScreen/Offer.png');
        this.load.image('accepted', './asset/images/winScreen/Accepted.png');
        this.load.image('wp', './asset/images/winScreen/WinPlayer.png');
        this.load.image('bg', './asset/images/lossScreen/LossBackground.png');


        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {
        //All image assets
        this.bg = this.add.tileSprite(0,0,720,480,'bg').setOrigin(0,0);
        this.offer = this.add.tileSprite(game.config.width/2,-70,317,93,'offer');
        this.result = this.add.tileSprite(game.config.width/2,150,527,94,'accepted');
        this.result.alpha = 0;
        this.player = this.add.tileSprite(game.config.width/2,360,720,301,'wp');
        this.player.alpha = 0;

        //Animation tweens for the assets
        let offertween = this.tweens.add({
            targets: this.offer,
            y: 70,
            ease: 'Bounce.easeOut',
            duration: 2500,
        });

        let restween = this.tweens.add({
            targets: this.result,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 2000,
        });

        let pictween = this.tweens.add({
            targets: this.player,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 4000,
        });
        this.add.text(game.config.width/8, borderUISize*6 - borderPadding-10, "You won!!");
        this.add.text(game.config.width/8, borderUISize*6 - borderPadding+20, "Press W to continue, or S for menu.");

        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    }
    update(){
        //press w to go to next level
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            //window.currentLevel += 1;
            this.sound.play('sfx_Serrated');
            this.scene.start("playScene");
            
        }
        //press s to go to main menu
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.sound.play('sfx_LoosePin');
            this.scene.start("menuScene");
        }

    }
}