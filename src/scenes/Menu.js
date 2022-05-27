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

        this.add.text(200/2, 200, "This game is about getting pins into the right spot.");
        this.add.text(200/2, 230, "To fit into the conversation that you are having.");
        this.add.text(200/2, 260, "Use (w) to move pins up, use (a),(d) to move between pins.");


        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

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

    }
}