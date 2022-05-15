class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image

        //load all the audio elements
    }
    create() {

        this.add.text(200/2, 200, "This game is about getting pins into the right spot.");
        this.add.text(200/2, 230, "To fit into the conversation that you are having.");
        this.add.text(200/2, 260, "Use (w) to move pins up, use (a),(d) to move between pins.");


        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        //placeholder skip past menu into playscene
        //this.scene.start("playScene");
    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("playScene");
        }

    }
}