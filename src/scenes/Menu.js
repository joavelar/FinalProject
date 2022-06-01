class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image

        //load all the audio elements
        this.load.audio('sfx_LoosePin', './asset/sound/Loose_Pin.wav');
        this.load.audio('sfx_Switch', './asset/sound/Switch_Selection.wav');
        this.load.audio('sfx_TrueClick', './asset/sound/True_Click.wav');
        this.load.audio('sfx_Serrated', './asset/sound/Serrated_Click.wav');
    }
    create() {

        this.add.text(200/2, 200, "The Lockpicking Salesman Game");
        this.add.text(200/2, 230, "Based on the prompt: Fitting");
        this.add.text(200/2, 260, "Press W to continue");
        this.add.text(200/2, 260, "Press S to see credits");


        //define the s key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        //placeholder skip past menu into playscene
        //this.scene.start("playScene");

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