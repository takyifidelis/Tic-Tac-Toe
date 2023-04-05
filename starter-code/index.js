//DISPLAYING THE HOMEPAGE
let homePage = document.getElementById("homePage"); //HOMEPAGE
let board = document.getElementById("table");       //BOARD

// 
let vsPlayer = document.getElementsByClassName("vs-player")[0];
let vsCpu = document.getElementsByClassName("vs-cpu")[0];


// Defining the Variables
let Board;
let playerX = "<img src='./assets/icon-x.svg' id='x-img'>"; 
let playerO = "<img src='./assets/icon-o.svg' id='o-img'>";
let playerXwin = "<img src='./assets/icon-x-outline.svg' id='xwin-img'>";
let playerOwin = "<img src='./assets/icon-o-outline.svg' id='owin-img'>";;
var cells = document.getElementsByClassName('cell');
let currPlayer = playerX;
let gameOver = false;
let i = 0;



// PLAYER'S TURN
let xTurn = "<img src='./assets/xturn.svg' id='xturn'>";
let oTurn = "<img src='./assets/oturn.svg' id='oturn'>";
let turn = document.getElementsByClassName("first-row2")[0];    
turn.innerHTML = xTurn + " TURN";

//  END OF PLAYERS TURN





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
            // tile.addEventListener("mouseenter",hover)
            // tile.addEventListener("mouseleave",unhover)
            
            
                            
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
        cells[i].addEventListener('mouseover', function() {
            // Change image on mouseover
            if(cells[i].innerHTML == null){
                return
            }
            if (cells[i].innerHTML == playerO){
                cells[i].innerHTML = playerOwin;
            } else if (cells[i].innerHTML == playerX){
                cells[i].innerHTML = playerXwin;
            } else {
                return;
            }
        });

        cells[i].addEventListener('mouseout', function() {
            // Change image back on mouseout   
            if(cells[i].innerHTML == null){
                return
            } 
            if (cells[i].innerHTML == playerOwin){
                cells[i].innerHTML = playerO;
            } else if (cells[i].innerHTML == playerXwin){
                cells[i].innerHTML = playerX;
            } else {
                return;
            }
        });
    }
}
















// CHECKING FOR THE WINNER
//Horizontally
function checkWinner(){
    for (let r = 0; r < 3; r++){
        if (Board[r][0] == Board[r][1] && Board[r][1] == Board[r][2] && Board[r][0] != " " ){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                if(Board[r][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOwin;
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXwin;
                 }            
            }
            gameOver = true;
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
                    tile.innerHTML = playerOwin;
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXwin;
                 }
            
            }
            gameOver = true;
            return;
        }
    }

    //Diagonally**
    if(Board[0][0] == Board[1][1] && Board[1][1] == Board[2][2] && Board[0][0] != " "){
      for(let i = 0; i < 3; i++){
        let tile = document.getElementById(i.toString() + "-" + i.toString());
        if(Board[0][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOwin;
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXwin;
                 }
      }  
      gameOver = true;
      return;
    }

    //Anti-Digonally**
    if (Board[0][2] == Board[1][1] && Board[1][1] == Board[2][0] && Board[0][2] != " "){
        // 0-2
        let tile = document.getElementById("0-2");
        if(Board[0][2] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOwin;
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXwin;
            }

        // 1-1
       tile = document.getElementById("1-1");
        if(Board[1][1] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOwin;
                    
        }else{
            tile.classList.add("winnerX")                    
            tile.innerHTML = playerXwin;
        }

        // 2-0
        tile = document.getElementById("2-0");
        if(Board[2][0] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOwin;
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXwin;
                }

        gameOver = true;
        return;
    }
}
// end of CHECKING FOR THE WINNER



// Replaying the GAME





// function to reset the board to its initial state
function resetBoard() {

      
  }
   

