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
        //startButton.addEventListener("click", buildGameScreen);
      }
    


      buildSplashScreen();






}