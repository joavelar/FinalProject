class Win extends Phaser.Scene {
    constructor() {
        super("levelWin")
    }
    preload(){
        //load image

        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {




        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("menuScene");
        }

    }
}