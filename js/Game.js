class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Img);
    car2.addImage(car2Img);
    car3.addImage(car3Img);
    car4.addImage(car4Img);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      image(track,0,-displayWidth*4,displayWidth,displayHeight*8);
      
      //index of the array
      //index is a variable to go through each car in the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //plr is a variable to through all players one by one with each loop in the for loop
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        //index - 1 means its index number of the current car

        if (index === player.index){
          fill("red");
          ellipse(x,y,100,100);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        //inbuilt class that goes through the x and y of your current sprite
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance);
    }

    if(player.distance>6800){
      gameState = 2;
      player.rank = player.rank+1;
      Player.updateCarsAtEnd(player.rank);
      textSize(30);
      fill("red");
      text("Your Rank Is... Rank Number "+ player.rank,displayWidth/2,y-120);
    }

    drawSprites();
  }

  end(){
    console.log("gameEnded");
    console.log(player.rank);
   // game.update(2);
  }
}
