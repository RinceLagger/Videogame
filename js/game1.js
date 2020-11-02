"use strict";
const textObjetoPrueba = ["texto prueba1","texto prueba2"];


class Game1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player1;
    this.objects = [];
    this.isGameOver = false;

    this.proportionWall = (this.canvas.height/2)/(this.canvas.width*0.1);
  }

  startLoop() {
    this.player1 = new Player1(this.canvas);
    this.createRoom();//generamos la habitación y objetos
    const loop = () => {
    //   if (Math.random() > 0.97) {
    //     const y = Math.random() * this.canvas.height;
    //     this.enemies.push(new Enemy(this.canvas, y));
    //   }

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
    this.player1.update();
    // this.enemies.forEach((enemy) => {
    //   enemy.update();
    // });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {

    this.objects.forEach((object) => {
      object.draw();
    });

    this.player1.draw();


  }

  createRoom(){
    const ordenador = new Object(this.canvas,this.canvas.width/2,this.canvas.height/2, 50,50,textObjetoPrueba);
    this.objects.push(ordenador);

  }

  checkAllCollisions() {
    //this.player.checkScreen();
    this.objects.forEach((object, index) => {
      if (this.player1.checkCollisionObject(object)) {
       // this.player.loseLive();
       // this.enemies.splice(index, 1);
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