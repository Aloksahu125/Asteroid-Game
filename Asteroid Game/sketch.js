let shipV;
let asteroidV=[];
let asteroidNum=10;
let laserV=[];
let laserNum=500;
let isLost,isWon= false;
let d=0;
let l=255;
let theme;
let b= true;


function preload(){
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  shipV= new Ship();
  for(let i=0;i<asteroidNum;i++){
    
    asteroidV.push(new Asteroid());
  }
  theme = createSelect();
  theme.position(width-70,0);
  theme.option('Dark');
  theme.option('Light');
  
  theme.selected('Dark');
  
}

function draw() {
  Theme(theme.value());
  
  background(d);
  
 
  for(let i=0; i<asteroidV.length;i++){
    if(shipV.hits(asteroidV[i])){
      isLost= true;
    }
    asteroidV[i].render();
    asteroidV[i].update();
    asteroidV[i].edges();
      
  }
    


  for(let i=laserV.length-1; i>=0;i--){
    laserV[i].render();
    laserV[i].update();

    if(laserV[i].offscreen()){
      laserV.splice(i,1);
    }
    else{
      for(let j=asteroidV.length-1; j>=0;j--){
        if(laserV[i].hits(asteroidV[j])){

          if(asteroidV[j].r>15){
            let newAsteroids= asteroidV[j].breakup();
            asteroidV= asteroidV.concat(newAsteroids);
          }
          asteroidV.splice(j,1);
          laserV.splice(i,1);
          break;
        }
      }
    }
  }
  shipV.render();
  shipV.turn(isLost,isWon)
  shipV.update(isLost,isWon);
  shipV.edges();
  
  push();
  fill(l);
  textFont("Press Start 2P",18)
  text('Asteroids Remaining:'+asteroidV.length, width*0.03, height*0.05);
  text('Bullets Remaining:'+laserNum, width*0.03, height*0.1)
  pop();
  
  
  
  if(isLost){
    lost();
  }
  if(asteroidV.length==0){
    isWon= true;
    win();
  }
  
  
  
  if(keyIsDown(UP_ARROW)){
    shipV.boosting(true);
  }
  
  if(keyIsDown(32)){
    if(laserNum>=1){
      if(isWon===false){
        laserV.push(new Laser(shipV.pos, shipV.heading))
        laserNum--;
      }
    }
    else{
      isLost= true;
    }
  }

}


function keyReleased(){
  shipV.setRotation(0);
  shipV.boosting(false);
}


function keyPressed(){
  
  if (keyCode==13){
    restart();
  }
  
  if(keyCode==RIGHT_ARROW){
    shipV.setRotation(0.1);
  }
  else if(keyCode==LEFT_ARROW){
    shipV.setRotation(-0.1);
  }
  
  if (keyCode===70){
    fullscreen(isFullscreen);
    isFullscreen= !isFullscreen;
  }
}

function lost(){
  push();

  fill(l)
  textSize(40);
  textAlign(CENTER)
  textFont("Press Start 2P")
  text('YOU LOST',width/2, height/2);

  textSize(25);
  text('Press Enter to restart.',width/2,height*0.55);

  
  pop();
  strokeWeight(1.5)
}

function win(){
  push()
  fill(l)


  textSize(40);
  textAlign(CENTER);
  textFont("Press Start 2P")
  text('YOU WON!!!',width/2, height/2)
  
  textSize(25);
  text('Press Enter to restart.',width/2,height*0.55);
  pop()
  strokeWeight(1.5)
}

function restart(){
  let num=random(5,15);
  if(isWon===true){
    laserNum =100;
  } else{
    laserNum += floor(random(100,150));
  }
  isLost=false;
  isWon=false;
  strokeWeight(1);
  shipV.pos.x=width/2;
  shipV.pos.y=height/2;
  for(let i=0;i<num;i++){
    asteroidV.push(new Asteroid());
  }
  
}



function Theme(value){
  if(value==='Light'){
    d=255;
    l=0;
  }
  else{
    d=0;
    l=255;
  }
}

function windoeResized(){
  resizeCanvas(windowWidth, windowHeight);
}


