class Game extends Phaser.Scene{
  constructor(){
    super('Game');
  }


  preload(){
    this.load.image("boardBg", "assets/images.jpeg");
    this.load.image("wallT", "assets/wall1.jpg");
    this.load.image("wallR", "assets/wall2.jpg");
    this.load.image("wallB", "assets/wall3.jpg");
    this.load.image("wallL", "assets/wall4.jpg");
    this.load.image("basket" , "assets/basket.png");
    this.load.image("striker", "assets/striker.png");
  }


  create(){
    // adding board layout to canvas
    const boardBg = this.add.image(0,0, 'boardBg').setOrigin(0,0);
  
    // adding walls to layout
    // this.add.sprite(45, 45, 'wallT').setOrigin(0,0).setColliderWorldBounds(true);
    // this.add.sprite(485, 45, 'wallR').setOrigin(0,0).setColliderWorldBounds(true);
    // this.add.sprite(45, 485, 'wallB').setOrigin(0,0).setColliderWorldBounds(true);
    // this.add.sprite(45, 45, 'wallL').setOrigin(0,0).setColliderWorldBounds(true);
  
    const walls = this.physics.add.staticGroup();
    walls.create(45, 45, 'wallT').setOrigin(0,0);
    walls.create(485, 45, 'wallR').setOrigin(0,0);
    walls.create(45, 485, 'wallB').setOrigin(0,0);
    walls.create(45, 45, 'wallL').setOrigin(0,0);
    
    
    //adding basket
    const basket = this.physics.add.staticGroup();
    basket.create(80, 80, 'basket').setOrigin(0,0).setScale(0.5);
    basket.create(430, 80, 'basket').setOrigin(0,0).setScale(0.5);
    basket.create(80, 430, 'basket').setOrigin(0,0).setScale(0.5);
    basket.create(430, 430, 'basket').setOrigin(0,0).setScale(0.5);
  
    //adding striker
  
    //variables for striker
    gameState.strikerP1 = 395;
    gameState.strikerP2 = 137;
    gameState.velL = -160;
    gameState.velR = 160;
    gameState.isDragging = false;
    gameState.dragStartX = 0;
    gameState.dragStartY = 0;
  
  
    
    gameState.striker = this.physics.add.sprite(270,gameState.strikerP1, 'striker').setOrigin(0,0).setScale(0.2);
    gameState.striker.setCollideWorldBounds(true);
  
    this.physics.add.collider(gameState.striker, walls);
  
    this.physics.add.collider(gameState.striker, basket);
  
    gameState.cursors = this.input.keyboard.createCursorKeys();
  
  
  }

  update(){

    //striker movement 
    if (gameState.cursors.left.isDown) {
      if(gameState.striker.x > 162){
        gameState.striker.setVelocityX(gameState.velL);
      }else{
        gameState.striker.setVelocityX(0);
      }
    } else if (gameState.cursors.right.isDown) {
      if(gameState.striker.x < 373){
        gameState.striker.setVelocityX(gameState.velR);
      }else{
        gameState.striker.setVelocityX(0);
      }     
    } else {
    gameState.striker.setVelocityX(0);
    }


    
  }
}


const gameState = {};





const config = {
  type: Phaser.AUTO,
  width:550,
  height:550,
  backgroundColor: "bada55",
  physics:{
    default:'arcade',
    arcade:{
      enableBody:true,
      //gravity:{ x: 100},
    }
  },
  scene:[ Game ],
};

const game = new Phaser.Game(config);
