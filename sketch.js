var PLAY=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background1,background1Image;
var invisibleground;
var survivalTime=0;
var score;
var death;
var restart,restartImage;
var dieSound,jumpSound,checkSound;
var pickImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  background1Image=loadImage("farm.png");
 restartImage=loadImage("restart.jpg");
  //dieSound=loadSound("die.mp3");
  //checkSound=loadSound("checkPoint.mp3");
  jumpSound=loadSound("jump.mp3");
  pickImage=loadImage("pick.png");
}



function setup() {
  createCanvas(600,400)
  background1=createSprite(0,100,600,600);
  background1.addImage(background1Image);
  background1.scale=3;
  
  
  monkey=createSprite(50,350,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
invisibleground=createSprite(300,390,600,5)
  invisibleground.visible=false;
  
  
  
  picksGroup=createGroup();
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
  score=0;
  death=0;
}


function draw() {
  background("white");
 drawSprites();
  
   stroke("black");
  textSize(20);
  fill("black");
  text("Score :"+score,100,150);
  
  if(bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
  }
  
  
   stroke("black");
  textSize(20);
  fill("black");
  text("Death :"+death,100,200);
  if(obstaclesGroup.isTouching(monkey)){
    death=death+1;
    obstaclesGroup.destroyEach();
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time :"+survivalTime,100,100);
  
  
 
  if(picksGroup.isTouching(monkey)){
    death=death+1;
  }
  
  monkey.collide(invisibleground);
  background1.velocityX=-5;
  if(background1.x<0){
    background1.x=background1.width/2;
  }
  if(keyDown("space")){
    jumpSound.play();
  monkey.velocityY=-20;
  }
  monkey.velocityY = monkey.velocityY + 0.8
   
     stroke("black");
  textSize(20);
  fill("black");
    text("Use space to jump the monkey",100,50);
    
  spawnpick();
  spawnFoods();
  spawnObstacles();
  
  if(score===10){
   // checkSound.play();
    background1.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
   stroke("black");
  textSize(20);
  fill("black");
    text("You Won!!",200,200);
    
  }
  if(death===5){
   // dieSound.play();
    background1.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
   stroke("black");
  textSize(20);
  fill("black");
    text("You Lose!!",200,200);
    
  }
  
 
 
}




function spawnFoods(){
  if(frameCount%80===0){
    var banana=createSprite(600,100,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.scale=0.1;
    banana.y=Math.round(random(120,320));
    banana.lifetime=120;
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount%200===0){
    var obstacle=createSprite(600,380,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.scale=0.2;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnpick(){
  if(frameCount%350===0){
    var pick=createSprite(600,360,10,10);
    pick.addImage(pickImage);
    pick.velocityX=-3;
    pick.scale=0.4;
    pick.lifetime=120;
    picksGroup.add(pick);
}
}

