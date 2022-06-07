class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }
    preload(){
        //load images
        this.load.image('bg', './asset/images/creditScreen/CreditBackground.png');
        this.load.image('title', './asset/images/titleScreen/Title.png');
        this.load.image('credit', './asset/images/creditScreen/Credits.png');
        this.load.image('return', './asset/images/creditScreen/Return.png');
        this.load.image('thank', './asset/images/creditScreen/Thank.png');


        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {
        //load images
        this.bg = this.add.tileSprite(0,0,720,480,'bg').setOrigin(0,0);
        this.title = this.add.tileSprite(game.config.width/2,-70,344,93,'title');
        this.credit = this.add.tileSprite(game.config.width/2,-80,424,155,'credit');
        this.thank = this.add.tileSprite(game.config.width/2,340,164,88,'thank');
        this.thank.alpha = 0;
        this.return = this.add.tileSprite(game.config.width/2,420,276,20,'return');
        this.return.alpha = 0;

        //Animation tweens for the menu assets
        let titletween = this.tweens.add({
            targets: this.title,
            y: 70,
            ease: 'Bounce.easeOut',
            duration: 2500,
        });
        let credittween = this.tweens.add({
            targets: this.credit,
            y: 200,
            ease: 'Power1',
            duration: 3500,
            delay: 2000,
        });
        let thanktween = this.tweens.add({
            targets: this.thank,
            alpha: 1,
            ease: 'Power1',
            duration: 3500,
            delay: 4000,
        });
        let returntween = this.tweens.add({
            targets: this.return,
            alpha: 1,
            ease: 'Power1',
            duration: 3500,
            delay: 6000,
        });


        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.sound.play('sfx_Serrated');
            this.scene.start("menuScene");
        }

    }
}