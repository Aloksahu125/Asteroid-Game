function Ship(){
  this.pos= createVector(width/2, height/2);
  this.r=20;
  this.heading=0;
  this.rotation=0;  
  this.vel=createVector(0,0);
  this.isBoosting= false;  

  
  this.boosting= function(b){
    this.isBoosting= b;
  }
  
  this.update= function(lost, won){
    if(!lost && !won){
      if(this.isBoosting){
        this.boost();
      }
      this.pos.add(this.vel);
      this.vel.mult(0.9)
    }
  }
  
  this.boost= function(){
    var force =p5.Vector.fromAngle(this.heading);
    force.mult(0.7);
    this.vel.add(force);
    
  }

  this.hits= function(asteroid){
    let d= dist(this.pos.x,this.pos.y, asteroid.pos.x,asteroid.pos.y);
    return d<this.r+asteroid.r;
  }
  
  
  this.render= function(img){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2 );
    fill(d);
    stroke(l);
    triangle(-this.r,this.r,this.r,this.r,0,-this.r);
    pop();
  }
    
    this.edges=function(){
      if(this.pos.x>width+this.r){
        this.pos.x= -this.r
      } else if(this.pos.x< -this.r){
        this.pos.x= width+this.r;
      }
      
      if(this.pos.y>height+this.r){
        this.pos.y= -this.r
      } else if(this.pos.y< -this.r){
        this.pos.y= height+this.r;
      }
      
    }
    
    this.setRotation= function(a){
      this.rotation=a;
    }
    
    
    this.turn= function(lost, won){
      if(!lost && !won){
        this.heading+= this.rotation;
     }
    }
  
}