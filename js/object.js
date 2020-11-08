"use strict";

var imgMesa = new Image();
imgMesa.src = './images/mesa.png';
var imgCofre = new Image();
imgCofre.src = './images/cofre_sombrero.png';
var imgCama = new Image();
imgCama.src = './images/cama_turquesa.png';
var imgArmario = new Image();
imgArmario.src = './images/armario.png';
var imgCroma = new Image();
imgCroma.src = './images/croma.png';

class Object {
    constructor(canvas, x,y,sizeX,sizeY,text,index) {
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = x; 
      this.y = y;
      this.text = text;
      this.textContainer = document.querySelector("#dialogs p");
      this.indexTest = 0;
      this.images = [imgMesa, imgCofre,imgCama, imgArmario, imgCroma];
      this.index = index;
    }
  

  
    draw() {
        //console.log("pintando ordenador", this.x,this.y);
      // this.ctx.fillStyle = "red";
      // this.ctx.fillRect(this.x- this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
      //console.log(this.index, this.images[0], this.images[this.index]);
      this.ctx.drawImage(this.images[this.index],this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);
    }


    showTest(){//muestra los comentarios de los objetos al clickar sobre ellos
        
        
        let innerText = this.text[this.indexTest];
        this.textContainer.innerText = innerText;
        
        this.indexTest++;
        if(this.indexTest>=this.text.length)this.indexTest=0;
    }
  

  }


  class Ordenador extends Object {
    constructor(canvas, x,y,sizeX,sizeY,text,index) {
    super(canvas, x,y,sizeX,sizeY,text,index); 
    this.sizeY = this.sizeX /2;   
    
    }


    showTest(){//muestra los comentarios de los objetos al clickar sobre ellos
        
        
        let innerText = this.text[this.indexTest];
        this.textContainer.innerText = innerText;
        
        this.indexTest++;
    
        if(this.indexTest>=this.text.length)this.indexTest=0;

        return this.changeGame();
    }
  
    changeGame(){
        
        return true;
    }


  }


  class MagicHut extends Object {
    constructor(canvas, x,y,sizeX,sizeY,text,index) {
    super(canvas, x,y,sizeX,sizeY,text,index);    
    
    }


    showTest(){//muestra los comentarios de los objetos al clickar sobre ellos
        
        
        let innerText = this.text[this.indexTest];
        this.textContainer.innerText = innerText;
        
        this.indexTest++;
    
        if(this.indexTest>=this.text.length)this.indexTest=0;

        
    }
  
    findHut(){
        
        return true;
    }


  }
  