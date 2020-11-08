"use strict";

var img1 = new Image(); 
img1.src = './images/anim1Game2.png'; 
var img2 = new Image(); 
img2.src = './images/anim2Game2.png'; 

class Player2 {
  constructor(canvas, lives) {
    this.sizeX = 40;
    this.sizeY = 60;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10 + this.sizeX / 2;
    this.y = this.canvas.height / 2;
    this.speed = 5;
    this.directionX = 0;
    this.directionY =0;
    this.lives = lives;
    this.img = [img1,img2];
    this.currentImg = this.img[0];
    this.indexImg=0;
  }

  changeAnimation(){
    this.currentImg = this.img[this.indexImg];
    this.indexImg++;
    if(this.indexImg>this.img.length-1)this.indexImg=0;
    
  }

  update() {
    this.y = this.y + this.directionY * this.speed;
    this.x = this.x + this.directionX * this.speed;
  }

  draw() {
    // this.ctx.fillStyle = "green";
    // this.ctx.fillRect(
    //   this.x - this.size / 2,
    //   this.y - this.size / 2,
    //   this.size,
    //   this.size
    // );


    this.ctx.drawImage(this.currentImg,this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);
  }

  setDirectionX(direction) {
    this.directionX = direction;
  }

  setDirectionY(direction) {
    this.directionY = direction;
  }

  checkScreen() {
    if (this.y - this.sizeY / 2 <= 0) {
      this.directionY = 1;
    } else if (this.y + this.sizeY / 2 >= this.canvas.height) {
      this.directionY = -1;
    }  else if (this.x - this.sizeX / 2 <= 0) {
        this.directionX = 1;
      } else if (this.x + this.sizeX / 2 >= this.canvas.width) {
        this.directionX = -1;
      }
  }

  checkCollisionEnemy(enemy) {
    const collideRight = this.x + this.sizeX / 2 > enemy.x - enemy.size / 2;
    const collideLeft = this.x - this.sizeX / 2 < enemy.x + enemy.size / 2;
    const collideTop = this.y + this.sizeY / 2 > enemy.y - enemy.size / 2;
    const collideBottom = this.y - this.sizeY / 2 < enemy.y + enemy.size / 2;

    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
    }

    return false;
  }

  loseLive() {
    this.lives--;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}