class Complete extends Phaser.Scene {
    constructor() {
        super("gameCompletion")
    }
    preload(){
        //load image
        this.load.image('o', './asset/images/completeScreen/DealsCompleted.png');
        this.load.image('wap', './asset/images/completeScreen/PlayerVictory.png');
        this.load.image('bag', './asset/images/completeScreen/CompleteBackground.png');


        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {
        //All image assets
        this.bag = this.add.tileSprite(0,0,720,480,'bag').setOrigin(0,0);
        this.o = this.add.tileSprite(game.config.width/2,-70,610,209,'o');
        this.pl = this.add.tileSprite(game.config.width/2,360,361,251,'wap');
        this.pl.alpha = 0;

        //Animation tweens for the assets
        let offertween = this.tweens.add({
            targets: this.o,
            y: 110,
            ease: 'Bounce.easeOut',
            duration: 2500,
        });

        let pictween = this.tweens.add({
            targets: this.pl,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 3000,
        });
        this.add.text(game.config.width/8, borderUISize*6 - borderPadding+15, "Press W to continue, or S for menu.");

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