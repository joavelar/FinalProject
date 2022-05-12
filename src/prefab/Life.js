class Life extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.49;
        this.here = false;
    }

    getRandomInt(max) {//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
      }

    update() {
        let Lanes = [438,192,315];
        //move left 
        this.x -= this.moveSpeed;
        //not wrap around 
        if(this.x <= 0 - this.width){
            this.destroy();
        }
    }

}