"use strict";

class Follower {
  constructor(canvas, x, y) {
    this.size = 20;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;

  }



  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x- this.size/2, this.y - this.size / 2, this.size, this.size);
  }


}