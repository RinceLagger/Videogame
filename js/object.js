"use strict";

class Object {
    constructor(canvas, x,y,sizeX, sizeY,text) {
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = x; 
      this.y = y;
      this.text = text;
      this.textContainer = document.querySelector("#dialogs p");
      this.indexTest = 0;
     
    }
  

  
    draw() {
        //console.log("pintando ordenador", this.x,this.y);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x- this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
    }


    showTest(){//muestra los comentarios de los objetos al clickar sobre ellos
        
        
        let innerText = this.text[this.indexTest];
        this.textContainer.innerText = innerText;
        
        this.indexTest++;
        if(this.indexTest>=this.text.length)this.indexTest=0;
    }
  

  }


  class Ordenador extends Object {
    constructor(canvas, x,y,sizeX, sizeY,text) {
    super(canvas, x,y,sizeX, sizeY,text);    
    
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
  