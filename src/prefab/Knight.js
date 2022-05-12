class Knight extends Phaser.GameObjects.Container {
    constructor(scene, legs) {
        super(scene);        
        this.isSwinging = false;    //swinging weapon
        this.isJumping = false;     //Player jumped
        this.isFalling = false;     //Player fell
        this.playAtkSound = false; // setting up sound flags
        this.lane = 0;
        this.maxLives = 3; 
        this.Lives = 3;               //set lives to 3
        this.legs = scene.add.sprite(-40, -100, 'Legs').setOrigin(0, 0);
        //this.torso = scene.add.sprite(-55, -110, 'Arms').setOrigin(0, 0);
        this.spear = scene.add.sprite(-70+95, -110+52, 'Arms').setOrigin(0.4, 0.4);
        //console.log(this.legs.anims);
        this.add(this.legs);
        //this.add(this.torso);
        this.add(this.spear);
        this.width = 50;
        this.height = 50;
        
        //define appropriate sfx
        this.sfx = scene.sound.add('switch')
        
        // Spears used to debug the mouse pointer code

        // this.testX = 500;  //-160 to put spear point at pivot point
        // this.testY = -500;  //-100 to put spear point at pivot point
        // this.spear2 = scene.add.sprite(this.testX+96, this.testY+64, 'Spear').setOrigin(.5, .5);
        // this.add(this.spear2);

        // this.testXX = 425;
        // this.testYY = -425;
        // this.spear3 = scene.add.sprite(this.testXX+96, this.testYY+64, 'Spear').setOrigin(.5, .5);
        // this.add(this.spear3);

        // this.testOriginX = 475;
        // this.testOriginY = -475;
        // this.spear4 = scene.add.sprite(this.testOriginX+96, this.testOriginY+64, 'Spear').setOrigin(.5, .5);
        // this.add(this.spear4);

        //from https://phaser.discourse.group/t/how-to-move-sprite-and-his-body/6055

        this.colorArray = [0x6666ff, 0x9966ff, 0xff6699, 0xff33cc, 0xff66ff]
        this.arraySpot = 0;

        scene.input.on('pointermove', function (pointer) {
            this.aimX = pointer.x-this.x;
            this.aimY = pointer.y-this.y;
        }, this);
    }

    update() {
        if(!this.isJumping && !this.isFalling){
            if(Phaser.Input.Keyboard.JustDown(keyW) && this.y >= 193) {//&& this.y == 438
                this.isJumping = true;
                this.lane = this.y - 123;
                console.log(this.y);
                this.sfx.play();
    
            }else if (Phaser.Input.Keyboard.JustDown(keyS) && this.y <= 437) {
                this.isFalling = true
                this.lane = this.y + 123;
                console.log(this.y)
                this.sfx.play();
            }
        }
        if(this.isJumping){
            if (this.y <= this.lane){
                this.isJumping = false;
            }else if(this.isJumping){
                this.y -= 4.1
            }
        }
        if(this.isFalling){
            if (this.y >= this.lane){
                this.isFalling = false;
            }else if(this.isFalling){
                this.y += 4.1
            }  
        }


        //Spear turning (math from http://phaser.io/examples/v3/view/actions/rotate-container-facing-point)

        this.angleDeg = Math.atan2(-110-100-475+663 - this.aimY, -70+400+475-793 - this.aimX) * 180 / Math.PI -175;
        //the weird numbers are to make it easier to debug. Do not consolidate them!

        this.spear.setAngle(this.angleDeg);
    }

    reset() {
        this.y = this.y; 
        this.x = this.x;
    }

}