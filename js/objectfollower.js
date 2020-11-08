"use strict";

var imgSub = new Image(); 
imgSub.src = './images/sub.png'; 

class Follower {
  constructor(canvas, x, y) {
    this.size = 40;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;

  }



  draw() {
    // this.ctx.fillStyle = "green";
    // this.ctx.fillRect(this.x- this.size/2, this.y - this.size / 2, this.size, this.size);


    this.ctx.drawImage(imgSub,this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }


}