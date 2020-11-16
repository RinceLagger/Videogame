"use strict";
const textObjetoPrueba = ["Aún no estás preparado para la aventura de streamear enfrente de tus seguidores.","Estás seguro de que no quieres explorar un poco más papu?","Date una vuelta y puede que encuentres lo que buscas...!"];
const textObjetoPrueba2 = ["Esto es una cama y no es momento de ponerse a dormir Cienfuegos!", "No me has oído? Dormir no es una opción y para otros temas...esto es un videojuego para todos los públicos!"];
const textObjetoPrueba3 = ["Mameeenaaa, has encontrado el sombrero del futuro, creo que ya estás listo para enfrentarte al reto!"];
const textObjetoPrueba4 = ["Es un armario lleno de polvo y telarañas, procura que no lo enfoque la cámara en los directos a no ser que sea el día de Halloween loool", "A ver si algún día ordenamos un poco por aquí...Está hecho esto un tremendo Quilombo"];
const textObjetoPrueba5 = ["Un croma del Ali Express! Vamos a grabar unos buenos gameplays yeah!","ya va siendo hora de pensar en el próximo vídeo a grabar Cienfuegos!" ];
const textObjetoPrueba6 = ["Ratas bailarinas!, están bailando un tango! - Delocks, Grelas dejad de bailotear a todas horas! -", "Cuándo han aprendido las ratas a organizar partidillos de futbol?", "Creo que cuando sea famoso les compraré comida rata-premium."];

var room = new Image(); 
room.src = './images/Room.png';

class Game1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player1;
    this.objects = [];
    this.isGameOver = false;
    this.proportionWall =Math.abs((this.canvas.width*0.1)/ (this.canvas.height/2));
    this.imgFrente =[];
    this.audio = new Audio("./sounds/Audio-game1.mp3");
    
    
   }

  startLoop() {
    let timeReal = Date.now();
    this.audio.volume = 0.02;
    this.audio.play();


    this.player1 = new Player1(this.canvas);
    this.createRoom();//generamos la habitación y objetos
    this.createAnimations(); //generamos animaciones personaje
    let time = 0; //variable para definir tiempo entre animaciones
    

    const loop = () => {
      // console.log(this.audio.currentTime );

      if(Date.now()-timeReal >10){

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);

        time = this.changeMoveAnimations(time); //actualizamos animaciones de movimiento
        this.continueAudio();
      }else{
        this.onGame2(); //llamamos a la callback para pasar a game2
      }
      timeReal = Date.now();
    }else{
      window.requestAnimationFrame(loop);
    }
    };
    

    window.requestAnimationFrame(loop);

  }

  continueAudio(){
    if(this.audio.currentTime > 81){
      this.audio.currentTime === 0;
      this.audio.play();
    }
  }


  changeMoveAnimations(time){

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

    return time;

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
    this.ctx.moveTo(this.canvas.width*0.1, 0);
    this.ctx.lineTo(this.canvas.width*0.1, this.canvas.height/2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.9, 0);
    this.ctx.lineTo(this.canvas.width*0.9, this.canvas.height/2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.1, this.canvas.height/2);
    this.ctx.lineTo(this.canvas.width*0.9, this.canvas.height/2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.1, this.canvas.height/2);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.9, this.canvas.height/2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.stroke();

    /*------dibujamos fondo de la habitación--------------------*/

    this.ctx.drawImage(room,0, 0, this.canvas.width, this.canvas.height);

    /*----------------------------------------------------------------------*/

    this.objects.forEach((object) => {
      object.draw();
    });

    this.player1.draw();

    //this.ctx.drawImage(img,this.canvas.width/2-50, this.canvas.height/2, 100, 200);

  }
 
  createRoom(){



    const ordenador = new Ordenador(this.canvas,this.canvas.width/2 + this.canvas.width/14,this.canvas.height/2-this.canvas.height/11, this.canvas.width/4,100,textObjetoPrueba,0);
    this.objects.push(ordenador);

    const magicHut = new MagicHut(this.canvas,this.canvas.width/34+this.canvas.width*0.1,this.canvas.height/2 -this.canvas.width/55 ,this.canvas.width/12,this.canvas.width/12,textObjetoPrueba3, 1);
    this.objects.push(magicHut);

    const cama = new Object(this.canvas,this.canvas.width-this.canvas.width/8,this.canvas.height - this.canvas.height/9, this.canvas.width/5,this.canvas.height/5,textObjetoPrueba2, 2);
    this.objects.push(cama);

    const armario = new Object(this.canvas,this.canvas.width-this.canvas.width/5,this.canvas.height/2-this.canvas.height/4+20, this.canvas.width/8,this.canvas.height/2-20,textObjetoPrueba4, 3);
    this.objects.push(armario);

    const croma = new Object(this.canvas,this.canvas.width/20+40,this.canvas.height-this.canvas.height*0.2-40, this.canvas.width/12,this.canvas.height*0.4,textObjetoPrueba5, 4);
    this.objects.push(croma);

    
    const ratas = new Object(this.canvas,this.canvas.width/34+this.canvas.width*0.3,this.canvas.height/2 - this.canvas.width/44, this.canvas.height/4 -this.canvas.width/55,this.canvas.width/14,textObjetoPrueba6, 5);
    this.objects.push(ratas);

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
        if(this.objects[index].showTest() && this.player1.getHut()){
          this.isGameOver = true;
          this.audio.pause();
          this.audio.currentTime = 0;
        }
        else if(this.objects[index] instanceof MagicHut) this.player1.setHut(); 
        
      }
    });
  }

  game2(callback){
    this.onGame2 = callback;
  }


}