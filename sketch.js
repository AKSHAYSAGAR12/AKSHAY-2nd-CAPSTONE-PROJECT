var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImg, boyCollided, boy1;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;

var jumpSound, dieSound, checkpointSound;


function preload(){
 boyImg = loadImage("boy.gif");
 boyCollided = loadImage("boy1.jpg")
  
  groundImage = loadImage("background.jpg");
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");


  
 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(800,400);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  invisibleGround = createSprite(255, 650 );
  invisibleGround.visible = false;
  
  boy = createSprite(255,540);
  boy.addImage(boyImg);
 
  

  boy.scale = 0.5;
  
 
  
  gameOver = createSprite(378,340);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(370,398);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
 
  obstaclesGroup = createGroup();

  
  boy.setCollider("circle", 0,0,75);
  boy1 = createSprite(255,540)
  boy1.scale= 0.5;
  
  
  score = 0;
 
  
}

function draw() {
  
  background(180);
textSize(30);
  text("Score: "+ score, 1166, 86);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    boy1.visible= false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
   
    
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& boy.collide(invisibleGround)) {
        boy.velocityY = -12;
        jumpSound.play();
        
    }
    

    boy.velocityY = boy.velocityY + 0.8
  if(score>0 && score%100 === 0){
checkpointSound.play();
  }
    
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
       dieSound.play();
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      boy1.visible = true;
      
      boy1.addImage(boyCollided)
      if(mousePressedOver(restart))
      {
        reset();
      }
     
     
    
     
     
      ground.velocityX = 0;
      boy.velocityY = 0;
      
     
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
      
   }
  
 
 
  boy.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  score=0;

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(700,576);
   obstacle.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
         
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}



