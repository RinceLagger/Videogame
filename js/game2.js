"use strict";

class Game2 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.followers =[];
    this.enemies = [];
    this.isGameOver = false;
    this.hater; //eliminar prueba
  }

  startLoop() {
    this.player = new Player2(this.canvas, 3);


    const loop = () => {
      if (Math.random() > 0.97) { //generamos la aparición random de haters
      const y = Math.floor(Math.random() * this.canvas.height);
      const x = Math.floor(Math.random() * this.canvas.width);
        this.enemies.push(new Hater(this.canvas,x, y, this.player.getX(),this.player.getY()));
      }

    if (Math.random() > 0.98) { //generamos la aparición random de followers con menos probabilidad
        const y = Math.floor(Math.random() * this.canvas.height);
        const x = Math.floor(Math.random() * this.canvas.width);
          this.followers.push(new Follower(this.canvas,x, y));
     }


      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.player.update();
    // this.hater.update();
    this.enemies.forEach((hater) => {
      hater.update();
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    this.player.draw();
  // this.hater.draw();
    this.enemies.forEach((hater) => {
      hater.draw();
    });
    this.followers.forEach((follower) => {
      follower.draw();
    });
  }

  checkAllCollisions() {
    this.player.checkScreen();
    this.enemies.forEach((hater, index) => {
      if (this.player.checkCollisionEnemy(hater)) {
        //this.player.loseLive();
        this.enemies.splice(index, 1);
        // if (this.player.lives === 0) {
        //   this.isGameOver = true;
        //   this.onGameOver();
        // }
      }
    });
    this.followers.forEach((follower, index) => {
      if (this.player.checkCollisionEnemy(follower)) {
        //this.player.loseLive();
        this.followers.splice(index, 1);
        // if (this.player.lives === 0) {
        //   this.isGameOver = true;
        //   this.onGameOver();
        // }
      }
    });
  }

//   gameOverCallback(callback) {
//     this.onGameOver = callback;
//   }
}