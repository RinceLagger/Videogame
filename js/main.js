"use-strict";

window.addEventListener("load", main);


function main() {

    function buildDom(html){ //función que cambiará entre pantallas
        const main = document.querySelector("main");
        main.innerHTML = html;
    }

    function buildSplashScreen() {//genera pantalla inicio
        buildDom(`
            <audio id="miAudio" src="./sounds/Intro.mp3" autoplay controls>
            Your browser does not support the <code>audio</code> element.
            </audio>
            <div class="game-intro">
            
            <img src="./images/Portada.png" alt="title">
                
            <button id="start-button" class="animate__animated animate__bounceInDown
            ">StartGame</button>    
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
        <section class="game-screen ">
            <canvas></canvas>
            <div id="dialogs">
            <img src="./images/moveImageGame2.png" alt="movements">
            <p>Consigue <span id="subs">suscriptores</span> hasta alcanzar el partner antes de que se acabe el tiempo!<br> Ten cuidado con los <span id="haters">niños rata</span>!</p>
            
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



    function  buildWinScreen(score) {//genera pantalla victoria
        buildDom(`
        <div class="game-over game-win">
        <div class="imageContainer"></div>
        <h1>HAS GANADO!</h1>
        <p>Has conseguido el Partner haciendo respetar el nombre de Cienfuegos Online.</p>
        <p>Te han sobrado <span id="score">${score} segundos</span>. Intenta seguir mejorando tu puntuación!</p>
        </div> 
        `);

        setTimeout(buildSplashScreen,10000);

    }   

    
    function  buildGameOverScreen() {//genera pantalla victoria
        buildDom(`
        <div class="game-over">
        <div class="imageContainer"></div>
        <h1>GAME OVER!</h1>
        <p>Has perdido siendo humillado por niños de 8 años mientras streameabas. </p>
        <p>Te unes a la jauría de niños rata y acabas tus días hateando por los <br> mundos virtuales y comiendo doritos. </p>
        </div> 
        `);

        setTimeout(buildSplashScreen,10000);

    }  
    


    buildSplashScreen();






}