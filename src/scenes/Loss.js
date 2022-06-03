class Loss extends Phaser.Scene {
    constructor() {
        super("levelLoss")
    }
    preload(){
        //load image
        this.load.image('offer', './asset/images/lossScreen/Offer.png');
        this.load.image('declined', './asset/images/lossScreen/Declined.png');
        this.load.image('lp', './asset/images/lossScreen/LossPlayer.png');
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
        this.result = this.add.tileSprite(game.config.width/2,150,499,96,'declined');
        this.result.alpha = 0;
        this.player = this.add.tileSprite(game.config.width/2,360,297,240,'lp');
        this.player.alpha = 0;

        //Animation tweens for the assets
        let offertween = this.tweens.add({
            targets: this.offer,
            y: 70,
            ease: 'Bounce.easeOut',
            duration: 2500,
        });

        let restween = this.tweens.add({
            targets: this.offer,
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


        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    }
    update(){
        //press w to go to next level
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("playScene");
        }
        //press s to go to main menu
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("menuScene");
        }

    }
}