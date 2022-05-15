class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        //load menu image

        //load all the audio elements
    }
    create() {

        this.add.text(200, 200, "cryptic crawler play scene1");

        //define the w key
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        //placeholder skip past menu into playscene
        this.scene.start("playScene");
    }
    update(){
        //press w to start game
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("playScene");
        }

    }
}