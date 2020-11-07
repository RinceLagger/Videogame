"use strict";
const textObjetoPrueba = ["Estás seguro de que no quieres explorar un poco más?","Date una vuelta un poco más!"];
const textObjetoPrueba2 = ["Esto es una cama"];
const textObjetoPrueba3 = ["Has encontrado el sombrero del futuro, creo que ya estás listo para enfrentarte al reto!"];



class Game1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player1;
    this.objects = [];
    this.isGameOver = false;
    this.proportionWall =Math.abs((this.canvas.width*0.1)/ (this.canvas.height/2));
    this.imgFrente =[];
    
  }

  startLoop() {
    this.player1 = new Player1(this.canvas);
    this.createRoom();//generamos la habitación y objetos
    this.createAnimations(); //generamos animaciones personaje
    let time = 0;
    

    const loop = () => {
   

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
        time++;
        if(time===10){
          time=0;
          if(this.player1.directionY!=0 /*&& this.player1.directionX!=0*/ ){
           this.player1.changeAnimationFront();
          }
          else if(this.player1.directionY===0 && this.player1.directionX === -1 ){
            this.player1.changeAnimationLeft();
           }
          else if(this.player1.directionY===0 && this.player1.directionX === 1 ){
            this.player1.changeAnimationRight();
            //console.log("lateral");
           } 

        }


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

    

    /*----dibujamos las líneas limitadoras de la habitación en función del tamaño del canvas-----*/
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.05, 0);
    this.ctx.lineTo(this.canvas.width*0.05, this.canvas.height/2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.95, 0);
    this.ctx.lineTo(this.canvas.width*0.95, this.canvas.height/2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.05, this.canvas.height/2);
    this.ctx.lineTo(this.canvas.width*0.95, this.canvas.height/2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.05, this.canvas.height/2);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.95, this.canvas.height/2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.stroke();

    /*----------------------------------------------------------------------*/

    this.objects.forEach((object) => {
      object.draw();
    });

    this.player1.draw();

    //this.ctx.drawImage(img,this.canvas.width/2-50, this.canvas.height/2, 100, 200);

  }
 
  createRoom(){



    const ordenador = new Ordenador(this.canvas,this.canvas.width/2,this.canvas.height/2-this.canvas.height/9, this.canvas.width/3,textObjetoPrueba,0);
    this.objects.push(ordenador);

    // const cama = new Object(this.canvas,this.canvas.width/2,this.canvas.height-50, 100,50,textObjetoPrueba2, 0);
    // this.objects.push(cama);

    const magicHut = new MagicHut(this.canvas,this.canvas.width*0.1,this.canvas.height-50,50,textObjetoPrueba3, 0);
    this.objects.push(magicHut);

  }

  createAnimations(){
    
      this.imgFrente.push(imgFrente1);
      this.imgFrente.push(imgFrente2);
      this.imgFrente.push(imgFrente3);
      this.imgFrente.push(imgFrente4);
      this.imgFrente.push(imgFrente5);
  }

  checkAllCollisions() {
    
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