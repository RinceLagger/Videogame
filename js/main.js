"use-strict";

window.addEventListener("load", main);


function main() {

    function buildDom(html){ //función que cambiará entre pantallas
        const main = document.querySelector("main");
        main.innerHTML = html;
    }

    function buildSplashScreen() {
        buildDom(`
            <div class="game-intro">
                <div class="imageContainer"></div>
                <button id="start-button">StartGame</button>
            </div>
            `);
        const startButton = document.querySelector("button");
        startButton.addEventListener("click", buildGame1Screen);
      }

    function  buildGame1Screen() {
        buildDom(`
        <section class="game-screen">
            <canvas></canvas>
            <div id="dialogs">
            <p>Texto con observaciones de objetos</p>
            </div>
        </section>  
        `);

        const width = Math.floor(window.innerWidth*0.9);
        const height = Math.floor(window.innerHeight*0.8);

        

        const canvasElement = document.querySelector("canvas");

        canvasElement.setAttribute("width", width);
        canvasElement.setAttribute("height", height);

        const game1 = new Game1(canvasElement);

        game1.startLoop();


        canvasElement.addEventListener("click", objectivePosition);

        function objectivePosition(event){
            console.log("click");
            game1.player1.setDirection(event);
            //game1.player1.setDirectionY(event.clientY);

        }



    }     
    


    buildSplashScreen();






}