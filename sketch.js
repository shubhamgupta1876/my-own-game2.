
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja,ninja_running,ninja_killing;
var ground, invisibleGround, groundImage;
var jungle

var zombi, zombiImage,zombiGroup;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound




function preload(){
    ninja_running = loadAnimation("ninja(1).png","ninja(2).png","ninja (3).png");
  ninja_killing= loadAnimation("ninja(4).png");
  
  groundImage = loadImage("ground2.png");
  
  zombi= loadImage("zombi.png");
  
  jungle = loadImage("jungle.jpg")//"jungle2.jpg","jungle3.png");
  food = loadImage("food.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")


  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
 
}

function setup() {
  createCanvas(600,400);
  j=createSprite(200,200,600,400)
  j.addImage("b",jungle)
  ninja=createSprite(70,370,10,10)
  ninja.addAnimation("r",ninja_running)
  ninja.addAnimation("a" ,ninja_killing);


  ground = createSprite(300,180,100,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,370,900,10);
  invisibleGround.visible = false;



 gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  zombiGroup = createGroup();
  
  console.log("Hello" + 5)
  
  ninja.setCollider("circle",0,0,40);
  ninja.debug = true
  
  
}

function draw() {
 background("grey")
 j.velocityX=-5;
 if(j.x<100)
j.x=width/2
 
console.log("this is ",gameState)

if(gameState === PLAY){
  gameOver.visible = false
  restart.visible = false

  ground.velocityX = -(4+3*score/100);
  //scoring
  score = score + Math.round(getFrameRate()/60);

  if (score>0&& score%100===0){
  checkPointSound.play()
}

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if (keyDown("ENTER")){

    ninja.changeAnimation("ninja", ninja_killing);
  }
}
if(keyDown("space")&& ninja.y >= 100) {
  ninja.velocityY = -12;
  jumpSound.play()
}
ninja.velocityY = ninja.velocityY + 0.8



 function spawnzombi(){
 if (frameCount % 60 === 0){
  var zombi= createSprite(400,165,10,40);
  zombi.velocityX = -(6+ score/100);



  zombi.scale = 0.5;
  zombi.lifetime = 300;
 
 //add each obstacle to the group
  zombiGroup.add(zombi);
 }
 }
 ninja.collide(invisibleGround);
 drawSprites()
 }
