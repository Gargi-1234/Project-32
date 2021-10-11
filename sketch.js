const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour, bird1, birdGoing1, birdcoming1;
var birdGoing1Img, birdcoming1Img
var birdGoing2, birdcoming2;
var birdGoing2Img, birdcoming2Img
var night, morning
var bg = "6.jpg";

function preload() {
    
    birdGoing1Img = loadAnimation("swallow 1 copy.png","swallow 2 copy.png")
    birdcoming1Img = loadAnimation("swallow 1.png","swallow 2.png")
    birdGoing2Img = loadAnimation("dove1.png","dove2.png")

    night = loadSound("Night.mp3")
    morning = loadSound("morning.mp3")
}

function setup(){
    var canvas = createCanvas(500,500);
    engine = Engine.create();
    world = engine.world;

    
    birdGoing1 = createSprite(-100,120,10,10)
    birdGoing1.addAnimation("swallowGo", birdGoing1Img)    
        
    birdcoming1 = createSprite(600,120,10,10)
    birdcoming1.addAnimation("swallowcome", birdcoming1Img)    

}

function draw(){
    if(backgroundImg)
       
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);

  

    if(hour>=12){
        text("Time : "+ hour%12 + " PM", 50,100);
        birdGoing1.velocityX = 2
       
        
    }else if(hour==0){
        text("Time : 12 AM",100,100);
        birdcoming1.velocityX = -2
      
    }else{
       
        text("Time : "+ hour%12 + " AM", 50,100);
     
    }

    
    if(hour <= 24 && hour >= 12 ){
        night.play() 
       } else  if(hour <= 11 && hour >= 1 ) {
           morning.play()
       }
    
    getBackgroundImg();

    drawSprites()
}

async function getBackgroundImg(){

    // write code to fetch time from API
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  
    //change the data in JSON format and store it in variable responseJSON
    var responseJSON = await response.json();

    //fetch datetime from responseJSON
    var datetime = responseJSON.datetime;
    
    // slice the datetime to extract hour
    hour = datetime.slice(11,13);

    if(hour >= 20 && hour <= 2 ){
        bg = "3.jpg"
    } else 
    if(hour >= 3 && hour <= 5){
        bg = "2.jpg"
    } else 
    if (hour >= 6 && hour <= 8){
        bg = "1.jpg"
    } else 
    if(hour >= 9 && hour <= 15){
        bg = "6.jpeg"
    } else 
    if(hour >= 16 && hour <= 17){
        bg = "5.jpg"
    } else {
        bg = "4.jpg"
    }

    backgroundImg = loadImage(bg);
}
