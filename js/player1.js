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

var imgFrente1_s = new Image(); 
imgFrente1_s.src = './images/DeFrente1_somb.png'; 
var imgFrente2_s = new Image(); 
imgFrente2_s.src = './images/DeFrente2_somb.png'; 
var imgFrente3_s = new Image(); 
imgFrente3_s.src = './images/DeFrente3_somb.png'; 
var imgFrente4_s = new Image(); 
imgFrente4_s.src = './images/DeFrente4_somb.png'; 
var imgFrente5_s = new Image(); 
imgFrente5_s.src = './images/DeFrente5_somb.png'; 

var imgLateral1_s = new Image(); 
imgLateral1_s.src = './images/Lateral1_somb.png'; 
var imgLateral2_s = new Image(); 
imgLateral2_s.src = './images/Lateral2_somb.png'; 
var imgLateral3_s = new Image(); 
imgLateral3_s.src = './images/Lateral3_somb.png'; 
var imgLateral4_s = new Image(); 
imgLateral4_s.src = './images/Lateral4_somb.png'; 
var imgLateral5_s = new Image(); 
imgLateral5_s.src = './images/Lateral5_somb.png'; 
var imgLateral1_v_s = new Image(); 
imgLateral1_v_s.src = './images/Lateral1_somb_inv.png'; 
var imgLateral2_v_s = new Image(); 
imgLateral2_v_s.src = './images/Lateral2_somb_inv.png'; 
var imgLateral3_v_s = new Image(); 
imgLateral3_v_s.src = './images/Lateral3_somb_inv.png'; 
var imgLateral4_v_s = new Image(); 
imgLateral4_v_s.src = './images/Lateral4_somb_inv.png'; 
var imgLateral5_v_s = new Image(); 
imgLateral5_v_s.src = './images/Lateral5_somb_inv.png'; 

class Player1 {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizeX = this.canvas.width/14;
    this.sizeY = 3* this.canvas.width/18;
    
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width/2 - this.sizeX / 2;
    this.y = this.canvas.height - this.canvas.height/4;
    this.speedX = 1;
    this.speedY = 1;
    this.directionX = 0;
    this.directionY = 0;
    this.objectiveX = 0;
    this.objectiveY = 0;
    this.proportionWall =Math.abs((this.canvas.width*0.05)/ (this.canvas.height/2));
    this.magicHut = false;
    this.indexImg =0;
    this.imgFront = [imgFrente1,imgFrente2,imgFrente3,imgFrente4,imgFrente5];
    this.currentImg = this.imgFront[0];
    this.imgRight = [imgLateral1,imgLateral2,imgLateral3,imgLateral4,imgLateral5];
    this.imgLeft = [imgLateral1_v,imgLateral2_v,imgLateral3_v,imgLateral4_v,imgLateral5_v];
    
    this.imgSomb =[imgFrente1_s, imgFrente2_s, imgFrente3_s, imgFrente4_s, imgFrente5_s];
    this.imgRightSomb = [imgLateral1_s,imgLateral2_s,imgLateral3_s,imgLateral4_s,imgLateral5_s];
    this.imgLeftSomb = [imgLateral1_v_s,imgLateral2_v_s,imgLateral3_v_s,imgLateral4_v_s,imgLateral5_v_s];

    this.sizeXSomb =this.canvas.width/14 * 1.05;
    this.sizeYSomb = 3* this.canvas.width/18 * 1.05;
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
    
    this.y = this.y + this.directionY * this.speedY;
    this.x = this.x + this.directionX * this.speedX;
    this.checkObjective(); 
    this.checkSzenario(); 
    }

  draw() {

    this.ctx.drawImage(this.currentImg,this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);

  }

  setDirection(event) { //define el movimiento en x e y del jugador en función de la posición relativa al objetivo
    this.initialY= this.y;

    this.objectiveX =event.offsetX;
    this.objectiveY = event.offsetY;
      
    if((this.x - this.objectiveX)<0) this.directionX = 1;
    else if ((this.x - this.objectiveX)>0) this.directionX = -1;
    else this.directionX = 0;
    
    if(((this.y+this.sizeY / 4)-this.objectiveY)<0) this.directionY = 1;
    else if (((this.y+this.sizeY / 4)-this.objectiveY)>0) this.directionY = -1;
    else this.directionY = 0;

  }
  


  checkObjective(){ //comprueba si estás cerca de la posición indicada y para al jugador

      if((this.initialY+this.sizeY/2)<  11*this.canvas.height /16 && Math.abs((this.y+this.sizeY / 4)-this.objectiveY)>20 && Math.floor(this.y-this.initialY)<20 && this.conditionMoveY){//Zona superior de la habitación, alejamos al personaje en Y antes de ir a por el objetivo

        if(this.directionY>0){
          this.speedX =0;
          this.speedY = 1;
        }else if(this.directionY<0){
          this.speedX =0;
          this.speedY = -1;
        }else{
          this.speedX =0;
          this.speedY = 1;
        }

      }else{
        this.speedX =1;
        this.speedY =1;
        this.conditionMoveY = false;
        console.log("segunda");
        if(Math.abs(this.x-this.objectiveX)<2)this.directionX =0;

        if(Math.abs((this.y+this.sizeY / 4)-this.objectiveY)<2){
          this.directionY =0;       
        }
      }    
  }

  checkSzenario() { //comprueba que no se salga el personaje de la escena

    if (this.y +this.sizeY / 4 <= this.canvas.height/2) {
      this.y = this.canvas.height/2 - this.sizeY/4;
      this.directionY=0;
     
    }else if(this.y + this.sizeY / 2 >= this.canvas.height){
      this.y = this.canvas.height - this.sizeY/2;
      this.directionY=0;
    } 
    //comprobamos limites de pared izquierda
    const posWallIzq = Math.abs((this.x - this.sizeX/2)/(this.canvas.height -(this.y + this.sizeY/2)));

    if(posWallIzq<this.proportionWall){ //si chocamos separamos 3 pixels de la pared
      this.directionX = 0;
      this.directionY = 0;
      this.x = this.x +3;
      this.y = this.y +3;
    }
    //comprobamos limites de pared derecha
    const posWallDer = Math.abs((this.canvas.width-(this.x + this.sizeX/2))/(this.canvas.height -(this.y + this.sizeY/2)));

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

      this.conditionMoveY = true;

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

    if(this.magicHut ==false){
    this.magicHut = true;
    this.imgFront = this.imgSomb;
    this.imgRight = this.imgRightSomb; 
    this.imgLeft = this.imgLeftSomb;
    this.sizeX = this.sizeXSomb;
    this.sizeY = this.sizeYSomb;
    this.x = this.x + (this.x*0.05);
    this.y = this.y + (this.y*0.05);
    this.currentImg = this.imgSomb[0];
    }
  }

  getHut(){
    return this.magicHut;
  }

}