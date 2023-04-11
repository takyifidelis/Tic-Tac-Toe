//DISPLAYING THE HOMEPAGE
let homePage = document.getElementById("homePage"); //HOMEPAGE
let board = document.getElementById("table");       //BOARD
// 
let vsPlayer = document.getElementsByClassName("vs-player")[0];
let vsCpu = document.getElementsByClassName("vs-cpu")[0];



// Defining the Variables
let Board;
let playerX = "<img src='./assets/icon-x.svg' id='x-img'> "; 
let playerO = "<img src='./assets/icon-o.svg' id='o-img'>";
let playerXwin = "<img src='./assets/icon-x-outline.svg' id='xwin-img'> ";
let playerOwin = "<img src='./assets/icon-o-outline.svg' id='owin-img'>";
let playerXX = "<img src='./assets/icon-x-outline1.svg' id='owin1-img'>";
let playerOO = "<img src='./assets/icon-o-outline1.svg' id='owin1-img'>";
var cells = document.getElementsByClassName('cell');
let currPlayer = playerX;
let gameOver = false;
let i = 0;
let scores = {
    X: 0,
    O: 0,
    T: 0
};
let countT =0;

// DEFINING VARIABLES FOR THE WIN-RECTANGLE
let winnerP = document.getElementsByClassName("winnerP")[0];
let takes = document.getElementsByClassName("takes")[0];

let quit = document.getElementsByClassName("quit")[0];
let nextRounGamed = document.getElementsByClassName("next-round")[0];

// DEFINING VARIABLE FOR THE RESTART RECTANGLE
let cancel = document.getElementsByClassName("cancel")[0];
let restart = document.getElementsByClassName("restart")[0];
let redo = document.getElementsByClassName("first-row3")[0];
let redoRectangle = document.getElementsByClassName("rectangle1")[0]
let rectangle = document.getElementsByClassName("rectangle")[0];

//PLAYER'S TURN
let xTurn = "<img src='./assets/xturn.svg' id='xturn'>";
let oTurn = "<img src='./assets/oturn.svg' id='oturn'>";
let turn = document.getElementsByClassName("first-row2")[0];    
turn.innerHTML = xTurn + " TURN";
//END OF PLAYERS TURN

let takeP = document.getElementsByClassName("takee")[0];






redo.addEventListener("click",handleReset);
quit.addEventListener("click", quitGame)
cancel.addEventListener('click', cancelRestart)
// player vs player Board display
function showBoard(){
    homePage.style.display="none"
    board.style.display="inline-block";
    playerVsPlayer()
}
// Player vs CPU Board Display
function showBoardCpu(){
    homePage.style.display="none"
    board.style.display="inline-block";
    playerVsCpu()
}





//Starting the Game for Player vs Player
function playerVsPlayer(){
    Board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]

    for (let r = 0; r < 3; r++ ){
        for (let c = 0; c < 3; c++){
            let tile = document.getElementsByClassName("cell")[i];
            i++;
            tile.addEventListener("click",setTile)                    
        }
    }
    
}


function setTile(){
    if(gameOver){
        return;
    }
    
    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(Board[r][c] != " "){
        return; 
    }
    

    Board[r][c] = currPlayer;
    this.innerText = currPlayer;    

    if (currPlayer == playerO){
        currPlayer = playerX;
        
    }else{
        currPlayer = playerO;   
    } 
    
     
    
        if(this.innerText == playerO){            
            this.innerHTML = playerO;
            turn.innerHTML =  xTurn+ "TURN";
        }else{            
            this.innerHTML = playerX ;
            turn.innerHTML =  oTurn+ "TURN";
            }
    
    
    checkWinner();
    hover();
    
}

function hover(){
      // Loop through cells
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseenter', function() {
            // Change image on mouseenter         
            if(this.innerHTML.length === playerO.length){
                this.innerHTML = playerOwin;             

            } else if (this.innerHTML.length === playerX.length){
                this.innerHTML = playerXwin;                
            } else {                
                    return
            }
        });
        cells[i].addEventListener('mouseleave', function() {
            // Change image back on mouseleave   
            if(this.innerHTML.length == playerOwin.length){
                this.innerHTML = playerO;                
            } else if (this.innerHTML.length == playerXwin.length){
                this.innerHTML = playerX;                
            } else {
                return;
            }
        });
    }
}

// CHECKING FOR THE WINNER

function checkWinner(){
    //Horizontally
    for (let r = 0; r < 3; r++){
        if (Board[r][0] == Board[r][1] && Board[r][1] == Board[r][2] && Board[r][0] != " " ){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                if(Board[r][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX()
                          
            }
            gameOver = true;
            handleWin()
            return;
            
        }
        
    }
    
    //Vertically**
    for(let c = 0; c < 3; c++){
        if(Board[0][c] == Board[1][c]  && Board[1][c] == Board[2][c] && Board[0][c] != " "){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                if(Board[0][c] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                 }
            
            }
            gameOver = true;
            handleWin()
            return;
        }
    }

    //Diagonally**
    if(Board[0][0] == Board[1][1] && Board[1][1] == Board[2][2] && Board[0][0] != " "){
      for(let i = 0; i < 3; i++){
        let tile = document.getElementById(i.toString() + "-" + i.toString());
        if(Board[0][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                 }
      }  
      gameOver = true;
      handleWin()
      return;
    }

    //Anti-Digonally**
    if (Board[0][2] == Board[1][1] && Board[1][1] == Board[2][0] && Board[0][2] != " "){
        // 0-2
        let tile = document.getElementById("0-2");
        if(Board[0][2] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
            }

        // 1-1
       tile = document.getElementById("1-1");
        if(Board[1][1] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
        }else{
            tile.classList.add("winnerX")                    
            tile.innerHTML = playerXX;
        }

        // 2-0
        tile = document.getElementById("2-0");
        if(Board[2][0] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
                }

        gameOver = true;
        handleWin()
        
        return;
    }
    
}
}

function winEffectO(){
    takes.innerHTML = playerO + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#F2B137";
    winnerP.textContent = "Player 2 wins"
}
function winEffectX(){
    takes.innerHTML = playerX + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#31C3BD";
    winnerP.textContent = "Player 1 wins"
}
function tieEffect(){
    takes.innerHTML = "<span class='takee'> ROUND TIED</span> ";
    takes.style.color ="#A8BFC9";
    winnerP.textContent = ""

}
function tie(){
    
}

// end of CHECKING FOR THE WINNER



// Replaying the GAME





// function to reset the board to its initial state
function resetBoard() {
    
   for(let i = 0; i < cells.length; i++){
    cells[i].innerHTML = "";
    cells[i].style.backgroundColor = "#1F3641"   
    
   }
   for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener("click", setTile)
   }

      
}
function updateStatus(){

}

function handleReset(){
    board.style.position = "relative"
    board.style.opacity = "0.1";
    redoRectangle.style.position = "absolute";
    redoRectangle.style.display = "inline-block";
    redoRectangle.style.top = "0";
    redoRectangle.style.left = "0";
    redoRectangle.style.zIndex = "1";      
}
function handleWin(){

    // board.style.display = "none";
    board.style.position = "relative"
    board.style.opacity = "0.1";
   
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    

}
function handleTie(){

    // board.style.display = "none";
    board.style.position = "relative"
    board.style.opacity = "0.1";
   
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    takes.innerHTML = "<span class='takee'> ROUND TIED</span> ";
    takes.style.color ="#A8BFC9";
    winnerP.textContent = ""

}
function quitGame(){
   
    

}
function cancelRestart(){
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";     
    
}
function updateScore(player){
    scores[player]++

    document.getElementsByClassName("score-o-num")[0].textContent = scores.O;
    document.getElementsByClassName("score-x-num")[0].textContent = scores.X;
    document.getElementsByClassName("score-tie-num")[0].textContent = scores.T;
}
function nextRoundGame(){}
function newGame(){}
