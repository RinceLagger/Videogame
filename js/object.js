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
     
    }
  

  
    draw() {
        //console.log("pintando ordenador", this.x,this.y);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x- this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
    }


    showTest(){
        
        const textRandom = Math.floor(Math.random()*this.text.length);
        let innerText = this.text[textRandom];
        this.textContainer.innerText = innerText;


    }
  

  }
  