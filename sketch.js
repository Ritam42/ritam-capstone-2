gameState = PLAY;
gameState = END;
var monkey , monkey_running,monkeys,monkey_s
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,canvas, backgroundImg

function preload(){
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monkeys = loadImage("monkey_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImg = loadImage("background.png");
 
}



function setup() {
  canvas = createCanvas(displayWidth -400,displayHeight -300);
  
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
}


function draw() {
  
  background(backgroundImg);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
      camera.x = displayWidth/3;
     
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);        
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 2;
  }
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey_s.addImage(monkeys);
}

    if(score === 10){
      ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey_s.addImage(monkeys);

        textSize(20);
        fill("black");
        text("The End", 300, 300);  
    }

}


function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    
    banana.lifetime = 100;
    monkey.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
   
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
      
    obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }
}

