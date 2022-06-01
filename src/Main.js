//Title: Convo
//Authors: Tomas Hickman, Jose Velarde-Ruiz, Jonathan Hung
//Date Completed: 6/6/2022
//Creative Tilt: A lock picking salesman game where the player has to fit the correct dialogue in order to persuade a customer
//, if the player guesses incorrectly too much, their progress is undone one at a time
// 

let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 13;
let borderPadding = borderUISize / 3;

//reserve keyboard vars and mouse vars
let keyW, keyS, keyA, keyD;
