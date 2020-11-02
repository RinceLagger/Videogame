"use strict";

class Player1 {
  constructor(canvas) {
    this.sizeX = 40;
    this.sizeY = 40;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.sizeX / 2;
    this.y = this.canvas.height / 2;
    this.speed = 2;
    this.directionX = 0;
    this.directionY = 0;
    this.objectiveX = 0;
    this.objectiveY = 0;
    
  }

  update() {
    this.checkObjective();  
    this.y = this.y + this.directionY * this.speed;
    this.x = this.x + this.directionX * this.speed;
  
    }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      this.x - this.sizeX / 2,
      this.y - this.sizeY / 2,
      this.sizeX,
      this.sizeY
    );
  }

  setDirection(event) { //define el movimiento en x e y del jugador en función de la posición relativa al objetivo

    this.objectiveX =event.offsetX;
    this.objectiveY = event.offsetY;
    //console.log(this.objectiveX, this.objectiveY)   
    if((this.x - this.objectiveX)<0) this.directionX = 1;
    else if ((this.x - this.objectiveX)>0) this.directionX = -1;
    else this.directionX = 0;
    
    if((this.y - this.objectiveY)<0) this.directionY = 1;
    else if ((this.y - this.objectiveY)>0) this.directionY = -1;
    else this.directionY = 0;
  }


  checkObjective(){
      //console.log(Math.abs(this.y-this.objectiveY));  

      if(Math.abs(this.x-this.objectiveX)<5)this.directionX =0;
      if(Math.abs(this.y-this.objectiveY)<5){
        this.directionY =0;
        //console.log("paso por cero");
      }

  }

//   checkScreen() {
//     if (this.y - this.size / 2 <= 0) {
//       this.direction = 1;
//     } else if (this.y + this.size / 2 >= this.canvas.height) {
//       this.direction = -1;
//     }
//   }

  checkCollisionObject(object) {
    const collideRight = this.x + this.sizeX / 2 > object.x - object.sizeX / 2;
    
    const collideLeft = this.x - this.sizeX / 2 < object.x + object.sizeX / 2;
    const collideTop = this.y + this.sizeY / 2 > object.y - object.sizeY / 2;
    const collideBottom = this.y - this.sizeY / 2 < object.y + object.sizeY / 2;

    // console.log("comprobando colisiones")
    // console.log(this.x + this.sizeX / 2);
    // console.log(object.x - object.sizeX / 2);
    if (collideRight && collideLeft && collideTop && collideBottom) {//si colisionamos paramos al jugador
      console.log("colisión!");
      this.directionX = 0;
      this.directionY = 0;
      return true;
    }

    return false;
  }

//   loseLive() {
//     this.lives--;
//   }
}