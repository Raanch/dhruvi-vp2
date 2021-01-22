var dog,dogIMG, happyDog, happyDogIMG;
var database, food, foodStock ;
var fedTime, lastFed, foodObj;
function preload()
{
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
	database = firebase.database();
    createCanvas(1000,500);

    foodObj=new Food();

    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    feed = createButton("Feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    

    dog = createSprite(500,250,10,10);
    dog.addImage(dogIMG)
    dog.scale = 0.15;

} 

function draw() {  
  background(46,139,87);
  foodObj.display();

  textSize(25)
  fill("blue");

  fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data){
     lastFed = data.val()
    })
 

  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM", 350, 30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed :"+ lastFed + "AM", 350, 30)
  }
  drawSprites();
}

function readStock(data){
  food = data.val()
  foodObj.updateFoodStock(food);
}
function feedDog(){
  dog.addImage(happyDogIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}