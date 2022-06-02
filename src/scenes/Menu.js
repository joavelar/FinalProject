class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image
        this.load.image('title', './asset/images/titleScreen/Title.png');
        this.load.image('subtitle', './asset/images/titleScreen/Subtitle.png');
        this.load.image('playbutton', './asset/images/titleScreen/PlayButton.png');
        this.load.image('creditbutton', './asset/images/titleScreen/CreditButton.png');
        this.load.image('menuBg', './asset/images/titleScreen/MenuBackground.png');
        this.load.image('playbuttonS', './asset/images/titleScreen/PlayButtonSelect.png');
        this.load.image('creditbuttonS', './asset/images/titleScreen/CreditButtonSelect.png');

        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {
        //All image assets
        this.bg = this.add.tileSprite(0,0,720,480,'menuBg').setOrigin(0,0);
        this.title = this.add.tileSprite(game.config.width/2,-70,344,93,'title');
        this.sub = this.add.tileSprite(game.config.width/2,150,287,35,'subtitle');
        this.sub.alpha = 0;
        this.play = this.add.tileSprite(game.config.width/2,300,324,58,'playbutton');
        this.play.alpha = 0;
        this.cred = this.add.tileSprite(game.config.width/2,360,324,58,'creditbutton');
        this.cred.alpha = 0;

        //Animation tweens for the menu assets
        let titletween = this.tweens.add({
            targets: this.title,
            y: 70,
            ease: 'Bounce.easeOut',
            duration: 2500,
        });

        let subtween = this.tweens.add({
            targets: this.sub,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 2000,
        });

        let playtween = this.tweens.add({
            targets: this.play,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 4000,
        });

        let credtween = this.tweens.add({
            targets: this.cred,
            alpha: 1,
            ease: 'Power1',
            duration: 2500,
            delay: 4000,
        });

        //define the s key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        //placeholder skip past menu into playscene
        //this.scene.start("playScene");

        this.play.inputEnabled = true;
        this.cred.inputEnabled = true;

        //keep track of levels
        window.currentLevel = 0;
    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("creditScene");
        }

    }
}