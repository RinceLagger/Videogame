"use strict";
const textObjetoPrueba = ["Estás seguro de que no quieres explorar un poco más?","Date una vuelta un poco más!"];
const textObjetoPrueba2 = ["Esto es una cama"];
const textObjetoPrueba3 = ["Has encontrado el sombrero del futuro, creo que ya estás listo para enfrentarte al reto"];

class Game1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player1;
    this.objects = [];
    this.isGameOver = false;

    
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
      }else{
        this.onGame2(); //llamamos a la callback para pasar a game2
      }
    };

    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.player1.update();

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
    const ordenador = new Ordenador(this.canvas,this.canvas.width/2,this.canvas.height/2, 50,50,textObjetoPrueba);
    this.objects.push(ordenador);

    const cama = new Object(this.canvas,this.canvas.width/2,this.canvas.height-50, 100,50,textObjetoPrueba2);
    this.objects.push(cama);

    const magicHut = new MagicHut(this.canvas,this.canvas.width*0.1,this.canvas.height-50, 50,50,textObjetoPrueba3);
    this.objects.push(magicHut);


  }

  checkAllCollisions() {
    //this.player.checkScreen();
    this.objects.forEach((object, index) => {
      if (this.player1.checkCollisionObject(object)) { //una vez estamos pegados al objeto mostramos su texto asociado
        if(this.objects[index].showTest() && this.player1.getHut())this.isGameOver = true;
        else if(this.objects[index] instanceof MagicHut) this.player1.setHut(); 
        
      }
    });
  }

  game2(callback){
    this.onGame2 = callback;
  }


}