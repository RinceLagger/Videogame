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
    this.timeLeft =60;
    this.score = 0;
    this.audio = new Audio("./sounds/Audio_game2.mp3");
    this.audioSub = new Audio("./sounds/pop.mp3");
    this.audioHater = new Audio("./sounds/ooh.mp3");
  
  }

  startLoop() {

    this.audio.volume = 0.02;
    this.audio.play();

    this.player = new Player2(this.canvas, 3);
    let time = 0;
    let timeReal = Date.now();
    let timeLeftFollower =0; 
    let timeAnimPlayer = 0;

    const loop = () => {

      if(Date.now()-timeReal >10){

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
        timeAnimPlayer++;
        this.continueAudio()
        time = this.reduceTimeLeft(time);
        timeLeftFollower = this.disappearFollower(timeLeftFollower);

        if(timeAnimPlayer===10){
          this.player.changeAnimation();
          timeAnimPlayer=0;
          
        
        }
      }
      timeReal = Date.now();
    }else{
      window.requestAnimationFrame(loop);
    }
    
    };

    window.requestAnimationFrame(loop);
  }

  continueAudio(){
    if(this.audio.currentTime > 68){
      this.audio.currentTime === 0;
      this.audio.play();
    }
  }

  reduceTimeLeft(time){

    if(time===100){ //cada segundo que no se haya terminado el juego, resto un segundo al tiempo de juego
      this.timeLeft--;
      time = 0;
      if(this.timeLeft===0){ //si se acaba el tiempo antes de conseguir un número suficiente de subscriptores
        this.isGameOver =true;
        this.onGameOver();
        this.audio.pause(); 
        
        this.audio.currentTime = 0;
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
    /*----dibujamos el marcador con el tiempo y con la puntuación ---*/
    this.ctx.fillStyle = 'red';
    this.ctx.font = '30px "Comic Sans MS", cursive, sans-serif';
    this.ctx.fillText(`Time Left: ${this.timeLeft} s`,this.canvas.width -320,40);

    this.ctx.fillStyle = 'green';
    this.ctx.font = '30px "Comic Sans MS", cursive, sans-serif';
    this.ctx.fillText(`Subscribers: ${this.score}/30K`,this.canvas.width -320,80);
  }

  checkAllCollisions() {
    this.player.checkScreen();
    this.enemies.forEach((hater, index) => {
      if (this.player.checkCollisionEnemy(hater)) {
        
        this.audioHater.volume = 0.03;
        this.audioHater.play();
        
        this.enemies.splice(index, 1);
        if(this.score>0)this.score--;
        
      }
    });
    this.followers.forEach((follower, index) => {
      if (this.player.checkCollisionEnemy(follower)) {

        this.audioSub.volume = 0.04;
        this.audioSub.play();
        
        this.followers.splice(index, 1);
        this.score++;
        if (this.score===30) { 
          this.isGameOver = true;
          this.onGameWin(this.timeLeft); //ganamos al alcanzar los seguidores
          this.audio.pause(); 
        
          this.audio.currentTime = 0;
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