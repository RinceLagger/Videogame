"use strict";

/*---hacemos la carga de imágenes-----*/
var imgFrente1 = new Image(); 
imgFrente1.src = './images/DeFrente1.png'; 
var imgFrente2 = new Image(); 
imgFrente2.src = './images/DeFrente2.png'; 
var imgFrente3 = new Image(); 
imgFrente3.src = './images/DeFrente3.png'; 
var imgFrente4 = new Image(); 
imgFrente4.src = './images/DeFrente4.png'; 
var imgFrente5 = new Image(); 
imgFrente5.src = './images/DeFrente5.png'; 
var imgLateral1 = new Image(); 
imgLateral1.src = './images/Lateral1.png'; 
var imgLateral2 = new Image(); 
imgLateral2.src = './images/Lateral2.png'; 
var imgLateral3 = new Image(); 
imgLateral3.src = './images/Lateral3.png'; 
var imgLateral4 = new Image(); 
imgLateral4.src = './images/Lateral4.png'; 
var imgLateral5 = new Image(); 
imgLateral5.src = './images/Lateral5.png'; 
var imgLateral1_v = new Image(); 
imgLateral1_v.src = './images/Lateral1_v.png'; 
var imgLateral2_v = new Image(); 
imgLateral2_v.src = './images/Lateral2_v.png'; 
var imgLateral3_v = new Image(); 
imgLateral3_v.src = './images/Lateral3_v.png'; 
var imgLateral4_v = new Image(); 
imgLateral4_v.src = './images/Lateral4_v.png'; 
var imgLateral5_v = new Image(); 
imgLateral5_v.src = './images/Lateral5_v.png'; 

class Player1 {
  constructor(canvas) {
    this.sizeX = 120;
    this.sizeY = 300;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width/4 - this.sizeX / 2;
    this.y = this.canvas.height - this.canvas.height/4;
    this.speed = 1;
    this.directionX = 0;
    this.directionY = 0;
    this.objectiveX = 0;
    this.objectiveY = 0;
    this.proportionWall =Math.abs((this.canvas.width*0.1)/ (this.canvas.height/2));
    this.magicHut = false;
    this.indexImg =0;
    this.imgFront = [imgFrente1,imgFrente2,imgFrente3,imgFrente4,imgFrente5];
    this.currentImg = this.imgFront[0];
    this.imgRight = [imgLateral1,imgLateral2,imgLateral3,imgLateral4,imgLateral5];
    this.imgLeft = [imgLateral1_v,imgLateral2_v,imgLateral3_v,imgLateral4_v,imgLateral5_v];
    //this.currentLat1Img = this.imgLat1[0];
  }

  changeAnimationFront(){
    this.currentImg = this.imgFront[this.indexImg];
    this.indexImg++;
    if(this.indexImg>4)this.indexImg=0;
    
  }
  changeAnimationRight(){
    this.currentImg = this.imgRight[this.indexImg];
    this.indexImg++;
    if(this.indexImg>4)this.indexImg=0;
    
  }

  changeAnimationLeft(){
    this.currentImg = this.imgLeft[this.indexImg];
    this.indexImg++;
    if(this.indexImg>4)this.indexImg=0;
    
  }



  update() {
    
    this.y = this.y + this.directionY * this.speed;
    this.x = this.x + this.directionX * this.speed;
    this.checkObjective(); 
    this.checkSzenario(); 
    }

  draw() {
    // this.ctx.fillStyle = "green";
    // this.ctx.fillRect(
    //   this.x - this.sizeX / 2,
    //   this.y - this.sizeY / 2,
    //   this.sizeX,
    //   this.sizeY
    // );

    this.ctx.drawImage(this.currentImg,this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);

  }

  setDirection(event) { //define el movimiento en x e y del jugador en función de la posición relativa al objetivo


    this.objectiveX =event.offsetX;
    this.objectiveY = event.offsetY;
    //console.log(this.objectiveX, this.objectiveY)   
    if((this.x - this.objectiveX)<0) this.directionX = 1;
    else if ((this.x - this.objectiveX)>0) this.directionX = -1;
    else this.directionX = 0;
    
    if((this.y - this.objectiveY)<0) this.directionY = 1;
    else if ((this.y - this.objectiveY)>0) this.directionY = -1;
    else this.directionY = 0;
  }
  


  checkObjective(){ //comprueba si estás cerca de la posición indicada y para al jugador
       

      if(Math.abs(this.x-this.objectiveX)<2)this.directionX =0;
      // if(Math.abs(this.y-this.objectiveY)<2){
      //   this.directionY =0;
      //   //console.log("paso por cero");//
      // }
      if(Math.abs((this.y+this.sizeY / 4)-this.objectiveY)<2){
        this.directionY =0;
        //console.log("paso por cero");//
      }

  }

  checkSzenario() { //comprueba que no se salga el personaje de la escena
    //console.log(this.y - this.sizeY / 2 )
    if (this.y +this.sizeY / 4 <= this.canvas.height/2) {
      this.y = this.canvas.height/2 - this.sizeY/4;
      if(this.directionX===0)this.directionY=0;
     // console.log(this.y)
    }else if(this.y + this.sizeY / 2 >= this.canvas.height){
      this.y = this.canvas.height - this.sizeY/2;
      if(this.directionX===0)this.directionY=0;
    } 
    //comprobamos limites de pared izquierda
    const posWallIzq = Math.abs((this.x - this.sizeX)/(this.canvas.height -(this.y + this.sizeY/2)));
    // console.log(this.canvas.height );
    // console.log((this.y + this.sizeY));
    // console.log(this.proportionWall);
    // console.log(posWallIzq);
    if(posWallIzq<this.proportionWall){ //si chocamos separamos 3 pixels de la pared
      this.directionX = 0;
      this.directionY = 0;
      this.x = this.x +3;
      this.y = this.y +3;
    }
    //comprobamos limites de pared derecha
    const posWallDer = Math.abs((this.canvas.width-(this.x + this.sizeX))/(this.canvas.height -(this.y + this.sizeY/2)));
    // console.log(this.canvas.height );
    // console.log((this.y + this.sizeY));
    // console.log(this.proportionWall);
    // console.log(posWallDer);
    if(posWallDer<this.proportionWall){ //si chocamos separamos 3 pixels de la pared
      this.directionX = 0;
      this.directionY = 0;
      this.x = this.x -3;
      this.y = this.y +3;
    }


  }

  checkCollisionObject(object) {




    const collideRight = this.x + this.sizeX / 2 > object.x - object.sizeX / 2;    
    const collideLeft = this.x - this.sizeX / 2 < object.x + object.sizeX / 2;
    const collideTop = this.y + this.sizeY / 2 > object.y - object.sizeY / 2;
    const collideBottom = this.y + this.sizeY / 6  < object.y + object.sizeY / 2;


    
    if (collideRight && collideLeft && collideTop && collideBottom) {//si colisionamos paramos al jugador
      console.log("directionX :",this.directionX );
      console.log("directionY :",this.directionY );
      // console.log("comprobando colisiones")

      //separamos 3 pixeles el personaje para permitir de nuevo movimiento en la dirección contraria a la que el personaje llevaba
      
      if(this.directionX ===1 && this.directionY ===-1 ){
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x - 3;
        this.y= this.y + 3;

      }
      else if(this.directionX ===1 && this.directionY ===1 ){
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x - 3;
        this.y= this.y - 3;
      }
      else if(this.directionX ===-1 && this.directionY ===-1 ){
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x + 3;
        this.y= this.y + 3;
      }
      else if(this.directionX ===-1 && this.directionY ===1) {
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x + 3;
        this.y= this.y - 3;
      }
      else if(this.directionX ===0 && this.directionY ===1) {
          this.directionX = 0;
          this.directionY = 0;
          this.y= this.y - 3;
        }
      else if(this.directionX ===1 && this.directionY ===0 ){
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x - 3;
        }
      else if(this.directionX ===0 && this.directionY ===-1 ){
        this.directionX = 0;
        this.directionY = 0;
        this.y= this.y + 3;
      }
      else if(this.directionX ===-1 && this.directionY ===0) {
        this.directionX = 0;
        this.directionY = 0;
        this.x = this.x + 3;
        }
      
      return true;
    }

    return false;
  }


  setHut(){
    this.magicHut = true;
  }

  getHut(){
    return this.magicHut;
  }

}