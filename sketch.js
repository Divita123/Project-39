var girl, girl_running, girl_collided;
var ground,groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;

function preload(){
  girl_running = loadAnimation("g1.png","g2.png","g3.png");
  girl_collided = loadAnimation("g1.png");  
  groundImage = loadImage("ground2.png"); 
  ground2 = loadImage("ground.png"); 
  cloudImage = loadImage("cloud.png"); 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  lose_img=loadImage("lose.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight-50);
  g = createSprite(200,400,400,20);
  g.addImage("ground",ground2);
  g.velocityX=7;
  girl = createSprite(50,500,20,50);
  girl.addAnimation("collided", girl_collided);
  girl.addAnimation("running", girl_running);
 
  ground = createSprite(200,550,400,20);
  ground.addImage("ground",groundImage);
  ground.visible=false;
  obstaclesGroup = createGroup();
  obstaclesGroup2 = createGroup();

  cloudsGroup = createGroup();
  girl.scale=0.20;
  girl.debug = false;
  
  score = 0;
}
function draw() {
  spawnClouds();
  background("lightblue");
 
  girl.x+=7;

    if(keyDown("UP_ARROW")&& girl.y >= 360) {
        girl.velocityY = -10;
       
      
        girl.changeAnimation("running", girl_running);
       
    }
    if(girl.y>=450){
      ground.x+=10;
    }
    
   girl.velocityY = girl.velocityY + 0.8
   textSize(20);
   fill("red")
   stroke("yellow");
   strokeWeight(1);
   text("Score = " +score  ,girl.x+500,50)
  score = score+ Math.round(frameCount/60)
   
  
  
    spawnObstacles();
    spawnObstacles2();
  
    if(obstaclesGroup.isTouching(girl)){
     
      girl.velocityX=0;
      girl.velocityY=0;
      girl.y=160;
      camera.position.x=girl.position.x;
      girl.changeAnimation("collided", girl_collided);
      obstaclesGroup.destroyEach(-1);
      cloudsGroup.destroyEach(-1);    
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);  
      textSize(30);
     
      fill("blue")
      stroke("yellow");
      strokeWeight(2);
      text("You Lose ", girl.x+160,150);  
      var lose=createSprite(750, 350,50,50);
      lose.addImage(lose_img);
      lose.scale=1;
      lose.velocityX=+10;   
    }     
  girl.collide(ground); 
     if(girl !== undefined){   
    camera.position.x = ground.x
  }

  score = score + Math.round(getFrameRate()/60);

  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(2000,500,10,40);
   obstacle.velocityX = -1;
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
    obstacle.scale = 0.20;
    obstacle.lifetime =1000;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,obstacle.width-100,obstacle.height-100);
    obstacle.debug = false;
 }

}
function spawnObstacles2(){
  if (frameCount % 150 === 0){
    var o2 = createSprite(3000,500,10,40);
    o2.velocityX = -1;
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: o2.addImage(obstacle1);
               break;
       case 2: o2.addImage(obstacle2);
               break;
       case 3: o2.addImage(obstacle3);
               break;
       case 4: o2.addImage(obstacle4);
               break;
       case 5: o2.addImage(obstacle5);
               break;
       case 6: o2.addImage(obstacle6);
               break;
       default: break;
     }
     o2.scale = 0.20;
     o2.lifetime =1000;
     obstaclesGroup2.add(o2);
     o2.setCollider("rectangle",0,0,o2.width-100,o2.height-100);
     o2.debug = false;
  }
 
 }

function spawnClouds() {
  if (frameCount % 150 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -3;
   cloud.lifetime = 200;
    cloud.depth = girl.depth;
    girl.depth = girl.depth + 1;
    cloudsGroup.add(cloud);
  }
}

