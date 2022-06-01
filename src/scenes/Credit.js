class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
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

        this.add.text(200/2, 200, "Convo");
        this.add.text(200/2, 230, "Coder/Programming - Jose Velarde-Ruiz");
        this.add.text(200/2, 230, "Sound Designer/Secondary Coder - Tomas Hickman");
        this.add.text(200/2, 230, "Artist/Secondary Coder - Jonathan Hung");
        this.add.text(200/2, 260, "Press W to go back to the main menu");


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