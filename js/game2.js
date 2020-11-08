"use strict";

var room2 = new Image(); 
room2.src = './images/game2_background.png';

class Game2 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.followers =[];
    this.enemies = [];
    this.isGameOver = false;
    this.timeLeft =30;
    this.score = 0;
  }

  startLoop() {
    this.player = new Player2(this.canvas, 3);
    let time = 0;
    let timeLeftFollower =0; 

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
        timeLeftFollower++;
        
        time = this.reduceTimeLeft(time);
        timeLeftFollower = this.disappearFollower(timeLeftFollower);

      }
    };

    window.requestAnimationFrame(loop);
  }

  reduceTimeLeft(time){

    if(time===100){ //cada segundo que no se haya terminado el juego, resto un segundo al tiempo de juego
      this.timeLeft--;
      time = 0;
      if(this.timeLeft===0){ //si se acaba el tiempo antes de conseguir un número suficiente de subscriptores
        this.isGameOver =true;
        this.onGameOver();

      }
    }
        return time;
  }

  
  disappearFollower(timeLeftFollower){
    
    if(timeLeftFollower===120){ //cada aprox 1 segundo segundos hacemos desaparecer el follower más antiguo aparecido
      this.followers.shift(); 
      timeLeftFollower =0;
    }
    return timeLeftFollower;

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

    this.ctx.drawImage(room2,0, 0, this.canvas.width, this.canvas.height);

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
    this.ctx.fillText(`Subscribers: ${this.score}/100K`,this.canvas.width -300,60);
  }

  checkAllCollisions() {
    this.player.checkScreen();
    this.enemies.forEach((hater, index) => {
      if (this.player.checkCollisionEnemy(hater)) {
        
        this.enemies.splice(index, 1);
        if(this.score>0)this.score--;
        
      }
    });
    this.followers.forEach((follower, index) => {
      if (this.player.checkCollisionEnemy(follower)) {
        
        this.followers.splice(index, 1);
        this.score++;
        if (this.score===20) { 
          this.isGameOver = true;
          this.onGameWin(); //ganamos al alcanzar los seguidores
          
        }
      }
    });
  }

  gameWin(callback){
    this.onGameWin = callback;
  }

  gameOver(callback){
    this.onGameOver = callback;
  }


}