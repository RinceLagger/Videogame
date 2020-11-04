"use strict";

class Game2 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.followers =[];
    this.enemies = [];
    this.isGameOver = false;
    this.timeLeft =60;
    this.score = 0;
  }

  startLoop() {
    this.player = new Player2(this.canvas, 3);
    let time = 0;

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
        time++;
        if(time===100){ //cada segundo que no se haya terminado el juego, resto un segundo al tiempo de juego
            this.timeLeft--;
            time = 0;
        }
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
    this.enemies.forEach((hater) => {
      hater.draw();
    });
    this.followers.forEach((follower) => {
      follower.draw();
    });
    /*----dibujamos el marcador con el tiempo---*/
    this.ctx.fillStyle = 'orange';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`Time Left: ${this.timeLeft} s`,this.canvas.width -300,30);

    this.ctx.fillStyle = 'blue';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`Score: ${this.score}/100`,this.canvas.width -300,60);
  }

  checkAllCollisions() {
    this.player.checkScreen();
    this.enemies.forEach((hater, index) => {
      if (this.player.checkCollisionEnemy(hater)) {
        
        this.enemies.splice(index, 1);
        this.score--;
        // if (this.player.lives === 0) {
        //   this.isGameOver = true;
        //   this.onGameOver();
        // }
      }
    });
    this.followers.forEach((follower, index) => {
      if (this.player.checkCollisionEnemy(follower)) {
        
        this.followers.splice(index, 1);
        this.score++;
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