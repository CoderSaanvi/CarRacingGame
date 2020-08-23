class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
//sets the playerCount
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  getCarsAtEnd(){
    var carsAtEndRef = database.ref("carsAtEnd");
    carsAtEndRef.on("value",(data) =>{
      this.rank = data.val();
    })
  }
//static functions have only one copy for the entire class and is accessed with the class name
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      //this. means current variable everytime any variable talks about their propeties, they access the current ones
      carsAtEnd:rank
    })
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  static removePlayers(){
    //your deleting the entire node in this
    database.ref('/').update({
      players: null
    })
  }
}
