"use strict";

class Hater {
  constructor(canvas, x, y, playerX, playerY) {
    this.size = 20;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.directionX = 0;
    this.directionY = 0;
    this.objectiveX = playerX;
    this.objectiveY = playerY;
    this.onObjectiveX = false;
    this.onObjectiveY = false;
    this.setDirectionX();
    this.setDirectionY();
  }

  update() {
    this.x = this.x + this.directionX * this.speed;
    this.y = this.y + this.directionY * this.speed;
    if(!this.onObjectiveX){
      this.setDirectionX();
      
    }
    if(!this.onObjectiveY){
      this.setDirectionY();
     
    }
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x- this.size/2, this.y - this.size / 2, this.size, this.size);
  }

  setDirectionX() { 

    // const proportion = (Math.abs(this.x - this.objectiveX)/Math.abs(this.y - this.objectiveY));

    // this.directionX = 1*proportion;
    // this.directionY = 1/proportion;
  
    if((this.x - this.objectiveX)<0) this.directionX = 1;
    else if ((this.x - this.objectiveX)>0) this.directionX = -1;
    else {
      this.onObjectiveX = true;
      if (!this.onObjectiveY)this.directionX =0;
    }

}

  setDirectionY() { 
  
    if((this.y - this.objectiveY)<0) this.directionY = 1;
    else if ((this.y - this.objectiveY)>0) this.directionY = -1;
    else {
      this.onObjectiveY = true;
      if (!this.onObjectiveX)this.directionY =0;
    }
  }



}