//DISPLAYING THE HOMEPAGE
let homePage = document.getElementById("homePage"); //HOMEPAGE
let board = document.getElementById("table");       //BOARD
//
let origBoard;

let cells = document.querySelectorAll(".cell")


let winCombos= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]





let vsPlayer = document.getElementsByClassName("vs-player")[0];
let vsCpu = document.getElementsByClassName("vs-cpu")[0];
 
//Selecting a player
let usePlayerX = document.getElementsByClassName("first-x")[0];
let usePlayerO = document.getElementsByClassName("first-o")[0];

// Defining the Variables
let Board;
let usePlayerOimage = "<img src='./assets/oplay copy.svg' id='playerOimageEffect'> ";
let usePlayerXimage = "<img src='./assets/xplay copy.svg' id='playerXimageEffect'> ";
let playerX = "<img src='./assets/icon-x.svg' id='x-img'> "; 
let playerO = "<img src='./assets/icon-o.svg' id='o-img'>";
let playerXwin = "<img src='./assets/icon-x-outline.svg' id='xwin-img'> ";
let playerOwin = "<img src='./assets/icon-o-outline.svg' id='owin-img'>";
let playerXX = "<img src='./assets/icon-x-outline1.svg' id='owin1-img'>";
let playerOO = "<img src='./assets/icon-o-outline1.svg' id='owin1-img'>";
var cellsf = document.getElementsByClassName('cell');
let currentPlayer = playerX;

let xWin = false;
let yWin = false;
let i = 0;
let Xscore = document.getElementsByClassName("score-x-num")[0];
let Oscore = document.getElementsByClassName("score-o-num")[0];
let tieScore = document.getElementsByClassName("score-tie-num")[0];
let scoreX = 0;
let scoreO = 0;
let scoreT = 0;

// Xscore.innerText = scoreX;
// Oscore.innerText = scoreO;
// tieScore.innerText = scoreT;


// DEFINING VARIABLES FOR THE WIN-RECTANGLE
let winnerP = document.getElementsByClassName("winnerP")[0];
let takes = document.getElementsByClassName("takes")[0];

let quit = document.getElementsByClassName("quit")[0];
let nextRound = document.getElementsByClassName("next-round")[0];

// DEFINING VARIABLE FOR THE RESTART RECTANGLE
let cancel = document.getElementsByClassName("cancel")[0];
let restart = document.getElementsByClassName("restart")[0];
let redo = document.getElementsByClassName("first-row3")[0];
let redoRectangle = document.getElementsByClassName("rectangle1")[0]
let rectangle = document.getElementsByClassName("rectangle")[0];
let aiPlayer = playerO;
let huPlayer = playerX;
//PLAYER'S TURN
let xTurn = "<img src='./assets/xturn.svg' id='xturn'>";
let oTurn = "<img src='./assets/oturn.svg' id='oturn'>";
let pturn = document.getElementsByClassName("first-row2")[0];    
pturn.innerHTML = xTurn + " TURN";
//END OF PLAYERS TURN

let takeP = document.getElementsByClassName("takee")[0];

function usePlayerOHandler() {
    usePlayerO.innerHTML = usePlayerOimage;
    usePlayerO.classList.add("use-player");
    usePlayerX.removeEventListener("click", usePlayerXHandler);
}

function usePlayerXHandler() {
    usePlayerX.innerHTML = usePlayerXimage;
    usePlayerX.classList.add("use-player");
    usePlayerO.removeEventListener("click", usePlayerOHandler);
}

usePlayerO.addEventListener("click", usePlayerOHandler);
usePlayerX.addEventListener("click", usePlayerXHandler);


playGame()
vsCpu.addEventListener("click", showBoard)
redo.addEventListener("click",handleReset)
quit.addEventListener("click", quitGame)
cancel.addEventListener('click', cancelRestart)
restart.addEventListener("click",restartGame)
nextRound.addEventListener("click",nextRoundGame)
// vsCpu.addEventListener("click", showBoard2)
// player vs player Board display

function showBoard(){    
    homePage.style.display="none";
    redoRectangle.style.display = "none";
    rectangle.style.display ="none";
    board.style.display="inline-block";
    board.style.position = "absolute";  
    board.style.opacity = "1";
    //setting initial scores to 0
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;
    Xscore.innerText = scoreX;
    Oscore.innerText =  scoreO;
    tieScore.innerText = scoreT;
    startGame()    
}



function playGame(){    
    homePage.style.display ="inline-block";
    
}

function startGame(){     
    
    document.getElementsByClassName("score-x")[0].innerHTML = "X(P1)"
    document.getElementsByClassName("score-o")[0].innerHTML = "O(P2)"
    renderGame()
}





//Starting the Game for Player vs Player

function renderGame(){   
    origBoard = Array.from(Array(9).keys());
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
        
    } 
}
  
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
    hover()
}

function turn(squareId, player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon);
    checkTie();
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == aiPlayer ? "#F2B137" : "#31C3BD";
            document.getElementById(index).innerHTML =
			gameWon.player == aiPlayer ? playerOO : playerXX;    
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameOver.player == huPlayer ? huPlayer+"TAKES THE ROUND" : aiPlayer+ "TAKES THE ROUND")
	//HANDLE WIN
    declareWinningMessage(gameOver.player == huPlayer ? "YOU WON!" : "OH NO, YOU LOST...")
}

function emptySquares(){
    return origBoard.filter(s => typeof s == "number");
}

function bestSpot(){
    return minimax(origBoard, aiPlayer).index;
}

function declareWinner(who){
    rectangle.style.display ="block";
    table.style.zIndex ="-1"
    takes.innerHTML = who;
}

function declareWinningMessage(msg){
    winnerP.innerHTML = msg;
}

 
function checkTie(){
    if (emptySquares().length == 0){
        for( let i = 0; i < cells.length; i++){
            cells[i].removeEventListener("click", turnClick, false);
            
        }
        declareWinner("ROUND TIED")
        declareWinningMessage("")
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}


// if(this.innerText == playerO){            
//     this.innerHTML = playerO;
//     turn.innerHTML =  xTurn+ "TURN";
// }else{            
//     this.innerHTML = playerX ;
//     turn.innerHTML =  oTurn+ "TURN";
//     }

// CHECKING FOR THE WINNER




    
    
    



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





function winEffectO(){
    takes.innerHTML = playerO + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#F2B137";
   
    
    
    
}

function winEffectX(){
    takes.innerHTML = playerX + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#31C3BD";
    winnerP.textContent = "Player 1 wins";
        
}







//QUIT GAME FUNCTION
function quitGame(){
   board.style.display ="none";
   rectangle.style.display ="none";
   homePage.style.display= "inline-block";    
}

function cancelRestart(){
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";        
}

//RESTART GAME
function restartGame(){
    redoRectangle.style.display = "none";
    board.style.opacity = "1";
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;   
    startGame()
}

function nextRoundGame(){
    rectangle.style.display ="none";
    board.style.opacity = "1";   
    board.style.position = "absolute"; 
   startGame()
}



//HANDLE RESET FUNCTION
function handleReset(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";
    redoRectangle.style.position = "absolute";
    redoRectangle.style.display = "inline-block";
    redoRectangle.style.top = "0";
    redoRectangle.style.left = "0";
    redoRectangle.style.zIndex = "1";      
}
// HANDLE WIN FUNCTION
function handleWin(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";   
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    updateScore()
}


