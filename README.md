# Videogame

Become a Famous Youtuber!

## Description

You are an anonymous youtuber looking to become famous. Inspect your room and when you are ready start to stream! 
If you do it well, you will be able to gain many followers!
While streaming, the objective is to collect followers while you avoid your "haters". You must achieve a certain number of followers before the time expires.

## MVP (DOM-CANVAS)

A player that come move across a room by clicking the zone of the room. If the computer-object is clicked, the streaming will start (the game).
In the game, the player will be move with the arrows of the keyboard. Followers "green-rectangles" collected increase your punctuation. 
If the haters ("red-rectangules") collides with the player, the punctuation will be decreased. You must achieve 100 points before the time expires.

## Data Structure

1. index.html

2. main.js

3. game1.js

4. player1.js

5. object.js

6. game2.js

7. player2.js

8. obstacle.js

## 1. index.html file

## 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createGameScreen / removeGameScreen
- createGameOverScreen / removeGameOverScreen
- createWinScreen / removeWinScreen
- startGame / endGame

## 3. Game1 Constructor

### Properties

- canvas
- ctx
- player1
- objects

### Methods

- startLoop
- checkCollision
- Exit

## 4. Player1 Constructor

### Properties

- canvas
- ctx
- x position
- y position
- width
- height
- image
- direction

### Methods

- draw
- update
- collidedWithObstacle
- collidedWithScreen

## 5. Object Constructor

### Properties

- canvas
- ctx
- id
- x position
- y position
- width
- height
- image
- text

### Methods

- draw
- showText

## 6. Game2 Constructor

### Properties

- canvas
- ctx
- player2
- obstacle
- gameIsOver
- gameIsWon
- time


### Methods

- startLoop
- checkCollision
- checkTime
- checkPoints
- gameWon / gameOver
- printTime


## 7. Player2 Constructor

### Properties

- canvas
- ctx
- x position
- y position
- width
- height
- image
- directionX
- directionY
- score

### Methods

- draw
- update
- collidedWithObstacle
- collidedWithScreen
- printScore
- increasePoints
- decreasePoints

## 8. Object Constructor

### Properties

- canvas
- ctx
- id
- x position
- y position
- width
- height
- image
- directionX
- directionY


### Methods

- draw
- update

## States and States Transitions

- startScreen
    - Start the game  
    - Goes to game1Screen when Start button is clicked
- game1Screen
    - Game running until the "computer-object" is clicked or the "exit door" is clicked
    - Goes to the game2Screen if "computer-object" is clicked
    - Goes to startScreen if "exit door" is clicked
- game2Screen
    - Game running until objective score is achieved or the time is over
    - Goes to gameoverScreen if time is over
    - Goes to winScreen if the objective score is achieved
- gameoverScreen
    - Shows Game Over message and Restart button
    - Goes back to Game Screen when Restart button is clicked
- winScreen
    - Shows Win message, random quote, time score, scoreboard and Restart button
    - Goes back to Game Screen when Restart button is clicked

## Tasks

- Setup git & GitHub
- Create and connect files: main.js, player.js, obstacle.js,
- BuildDom in main.js
- Create 5 screens in main.js
- Create screen transitions in main.js
- Create Game1 constructor
- Create loop in game1.js
- Create Player1 constructor
- Create Object constructor
- Draw objects in game1.js
- Move player1 in game.js
- Check Collisions in game1.js
- Check clicks in objects in game1.js
- Create Game2 constructor
- Create loop in game2.js
- Create Player2 constructor
- Create Obstacle constructor
- Draw objects in game2.js
- Move objects in game2.js
- Move player2 in game2.js
- Check Collisions in game2.js
- Check game result in game2.js
- Add time and print it in game2.js
- Add audios, img and fonts

## Backlog

- Add more objects to interact with them
- Add aditional screens/animation while interacting with objects
- Add more music/audio effects
- Move the player2 in game2 instead of with the arrows attached to the mouse

## Links

###Trello

[Link to Trello](https://trello.com/b/DEc1K2EF/ironhack-project1-videogame)


