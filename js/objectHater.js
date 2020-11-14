"use strict";


var imgHater = new Image(); 
imgHater.src = './images/hater2.png'; 
var imgHaterMore = new Image(); 
imgHaterMore.src = './images/hater2more.png'; 

class Hater {
  constructor(canvas, x, y, playerX, playerY, speed, indexImg) {
    this.size = 50;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.directionX = 0;
    this.directionY = 0;
    this.objectiveX = playerX;
    this.objectiveY = playerY;
    this.onObjectiveX = false;
    this.onObjectiveY = false;
    this.setDirectionX();
    this.setDirectionY();
    this.img = [imgHater,imgHaterMore ];
    this.currentImg = this.img[indexImg];
  }

  update() {

    if(!this.onObjectiveX){
      this.setDirectionX();
      
    }
    if(!this.onObjectiveY){
      this.setDirectionY();
     
    }

    this.x = this.x + this.directionX * this.speed;
    this.y = this.y + this.directionY * this.speed;
  
  }

  draw() {

    this.ctx.drawImage(this.currentImg,this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  setDirectionX() { //define la dirección en el eje X del hater. Si alcanza la posición X que tenía el player al originarse el hater, no se mueve más en ese eje


    if((this.x - this.objectiveX)<0 && Math.abs(this.x - this.objectiveX)>6) this.directionX = 1;
    else if ((this.x - this.objectiveX)>0 && Math.abs(this.x - this.objectiveX)>6 ) this.directionX = -1;
    else {
      this.onObjectiveX = true;
      if (!this.onObjectiveY)this.directionX =0; //paramos el movimiento del primer eje X/Y al que se llegue, para que el objeto siga en movimiento y salga del mapa
    }

}

  setDirectionY() { //define la dirección en el eje Y del hater. Si alcanza la posición Y que tenía el player al originarse el hater, no se mueve más en ese eje


    if((this.y - this.objectiveY)<0 && Math.abs(this.y - this.objectiveY)>6) this.directionY = 1;
    else if ((this.y - this.objectiveY)>0 && Math.abs(this.y - this.objectiveY)>6) this.directionY = -1;
    else {
      this.onObjectiveY = true;
      if (!this.onObjectiveX)this.directionY =0;//paramos el movimiento del primer eje X/Y al que se llegue, para que el objeto siga en movimiento y salga del mapa
    }
  }

}