"use-strict";

window.addEventListener("load", main);


function main() {

    function buildDom(html){ //función que cambiará entre pantallas
        const main = document.querySelector("main");
        main.innerHTML = html;
    }

    function buildSplashScreen() {//genera pantalla inicio
        buildDom(`
            <div class="game-intro">
                <div class="imageContainer"></div>
                <button id="start-button">StartGame</button>
            </div>
            `);
        const startButton = document.querySelector("button");
        startButton.addEventListener("click", buildGame1Screen);
      }

    function  buildGame1Screen() {//genera pantalla game1
        buildDom(`
        <section class="game-screen">
            <canvas></canvas>
            <div id="dialogs">
            <p>Bienvenido a la habitación...qué digo, al templo de trabajo de Cienfuegos. Inspecciona el lugar y consigue ser el Youtuber más famoso del mundo</p>
            </div>
        </section>  
        `);

        const width = Math.floor(window.innerWidth*0.9);
        const height = Math.floor(window.innerHeight*0.8);

        

        const canvasElement = document.querySelector("canvas");

        canvasElement.setAttribute("width", width);
        canvasElement.setAttribute("height", height);

        const game1 = new Game1(canvasElement);

        game1.game2(buildGame2Screen);

        game1.startLoop();


        canvasElement.addEventListener("click", objectivePosition); //añado funcionalidad con el ratón para el game1

        function objectivePosition(event){
            //console.log("click");
            game1.player1.setDirection(event);
            
        }

    }     


    function  buildGame2Screen() {//genera pantalla game2
        buildDom(`
        <section class="game-screen">
            <canvas></canvas>
            <div id="dialogs">
            <p>juego 2</p>
            </div>
        </section>  
        `);

        const width = Math.floor(window.innerWidth*0.9);
        const height = Math.floor(window.innerHeight*0.8);

        

        const canvasElement = document.querySelector("canvas");

        canvasElement.setAttribute("width", width);
        canvasElement.setAttribute("height", height);

        const game2 = new Game2(canvasElement);

        const setPlayerDirection = (event) => { //añado funcionalidad con las flechas del teclado para el game2

            if (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowRight" || event.code === "ArrowLeft" ) {
                game2.player.setDirectionY(0);
                game2.player.setDirectionX(0);
            }
            
            game2.player.setDirectionY(0);

            if (event.code === "ArrowUp") {
              game2.player.setDirectionY(-1);
            } if (event.code === "ArrowDown") {
              game2.player.setDirectionY(1);
            } if (event.code === "ArrowRight") {
                game2.player.setDirectionX(1);
            }else if (event.code === "ArrowLeft") {
                game2.player.setDirectionX(-1);
            }
            
          };
      
          document.addEventListener("keydown", setPlayerDirection);

          game2.gameWin(buildWinScreen);  
          game2.gameOver(buildGameOverScreen);  

          game2.startLoop();

    }   



    function  buildWinScreen() {//genera pantalla victoria
        buildDom(`
        <div class="game-win">
        <div class="imageContainer"></div>
        
        </div> 
        `);

        setTimeout(buildSplashScreen,5000);

    }   

    
    function  buildGameOverScreen() {//genera pantalla victoria
        buildDom(`
        <div class="game-over">
        <div class="imageContainer"></div>
        
        </div> 
        `);

        

    }  
    


    buildSplashScreen();






}