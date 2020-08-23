var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var carsAtEnd;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1Img,car2Img,car3Img,car4Img,track;

function preload(){
  // ./ takes the absolute the value from the root folder/ from the beginning  The name of ./ is absolute part of a file
  // you need relative parts when the files are presented or stored in the same folder
  track = loadImage("./images/track.jpg");
  car1Img = loadImage("./images/car1.png");
  car2Img = loadImage("./images/car2.png");
  car3Img = loadImage("./images/car3.png");
  car4Img = loadImage("./images/car4.png");
}


function setup(){
  //displayWidth or height takes the entire windows width and height, -30 takes some of the marjin
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}
