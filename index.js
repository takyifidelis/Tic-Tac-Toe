//DISPLAYING THE HOMEPAGE
const homePage = document.getElementById("homePage"); //HOMEPAGE
const board = document.getElementById("table");       //BOARD
//
let origBoard;
let cells = document.querySelectorAll(".cell")

const vsPlayer = document.querySelector(".vs-player");
const vsCpu = document.querySelector(".vs-cpu");
 
//Selecting a player
const usePlayerX = document.querySelector(".first-x");
const usePlayerO = document.querySelector(".first-o");

// Defining the Variables
//Variables for the Images
let usePlayerOimage = "<img src='./assets/oplay copy.svg' id='playerOimageEffect'> ";
let usePlayerXimage = "<img src='./assets/xplay copy.svg' id='playerXimageEffect'> ";
let usePlayerOinitImg = "<img src='./assets/oplay.svg' >";
let usePlayerXinitImg = "<img src='./assets/Xplay.svg' >";
let playerX = "<img src='./assets/icon-x.svg' id='x-img'> ";  
let playerO = "<img src='./assets/icon-o.svg' id='o-img'>";
let playerXwin = "<img src='./assets/icon-x-outline.svg' id='xwin-img'> ";
let playerOwin = "<img src='./assets/icon-o-outline.svg' id='owin-img'>";
let playerXX = "<img src='./assets/icon-x-outline1.svg' id='xwin1-img'>";
let playerOO = "<img src='./assets/icon-o-outline1.svg' id='owin1-img'>";
//Variables for the Scores
const playerXscoreDisplay = document.querySelector(".score-x");
const playerOscoreDisplay = document.querySelector(".score-o");
const xScoreNumber = document.querySelector(".score-x-num");
const oScoreNumber = document.querySelector(".score-o-num");
const tieScoreNumber = document.querySelector(".score-tie-num");
let setLocalStorage = (key, value) =>{
    localStorage.setItem(key,JSON.stringify(value))
}
let getLocalStorage = (key) =>{

    let localStorageValue = localStorage.getItem(key) 
    localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : [0, 0, 0]
    return localStorageValue
}
let [scoreX, scoreT, scoreO] = getLocalStorage("scores")
console.log(scoreX, scoreT, scoreO, "before")
// let scoreX = 0;
// let scoreO = 0;
// let scoreT = 0;

// DEFINING VARIABLES FOR THE WIN-RECTANGLE
const winnerP = document.querySelector(".winnerP");
const takes = document.querySelector(".takes");

// Defining Varibles for the buttons
const quitBtn = document.querySelector(".quit");
const nextRoundBtn = document.querySelector(".next-round");
const cancelBtn = document.querySelector(".cancel");
const restartBtn = document.querySelector(".restart");
const redoBtn = document.querySelector(".first-row3");

// DEFINING VARIABLE FOR THE RESTART RECTANGLE
const redoRectangle = document.querySelector(".rectangle1");
const rectangle = document.querySelector(".rectangle");

// players for vs Computer
let aiPlayer;
let huPlayer;
// players for multiPlayer game
let player1;
let player2;
let currentPlayer = playerX
//PLAYER'S TURN DISPLAY VARIABLES
const xTurn = "<img src='./assets/xturn.svg' id='xturn'>";
const oTurn = "<img src='./assets/oturn.svg' id='oturn'>";
const playerTurn = document.querySelector(".first-row2");    
//END OF PLAYERS TURN

//Defining the winning combinations
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


// FUNCTIONS
const selectAPlayer = () => {
    alert("PLEASE PICK A MARK!!!")
}
const usePlayerXHandler = () => {
    usePlayerX.innerHTML = usePlayerXimage;
    usePlayerX.classList.add("use-player");
    aiPlayer = playerO;
    huPlayer = playerX;
    player1 = playerX;
    player2 = playerO;

    usePlayerO.removeEventListener("click", usePlayerOHandler);
    vsCpu.removeEventListener("click", selectAPlayer)
    vsCpu.addEventListener("click", showBoard)
    vsPlayer.removeEventListener("click", selectAPlayer)  
    vsPlayer.addEventListener("click", showBoardVsPlayer)
}

const usePlayerOHandler = () => {
    usePlayerO.innerHTML = usePlayerOimage;
    usePlayerO.classList.add("use-player");
    aiPlayer = playerX;
    huPlayer = playerO;
    player1 = playerO
    player2 = playerX;
    usePlayerX.removeEventListener("click", usePlayerXHandler);

    vsCpu.removeEventListener("click", selectAPlayer)
    vsPlayer.removeEventListener("click", selectAPlayer) 
    vsCpu.addEventListener("click", showBoard)
    vsPlayer.addEventListener("click", showBoardVsPlayer)
}

const playGame = () => {    
    homePage.style.display ="inline-block";
    board.style.display = "none";
    vsCpu.addEventListener("click", selectAPlayer) 
    vsPlayer.addEventListener("click", selectAPlayer) 
    usePlayerO.addEventListener("click", usePlayerOHandler);
    usePlayerX.addEventListener("click", usePlayerXHandler);
}


const defaultPlayerSelection = () => {
    usePlayerX.innerHTML = usePlayerXinitImg;
    usePlayerX.classList.remove("use-player");
    usePlayerX.classList.add("use-first-effects")
    usePlayerO.innerHTML = usePlayerOinitImg;
    usePlayerO.classList.remove("use-player");
    usePlayerO.classList.add("use-first-effects")
    usePlayerO.removeEventListener("click", usePlayerOHandler);
    usePlayerX.removeEventListener("click", usePlayerXHandler); 
}

let displayInitialScores = () => {
    // scoreX = 0;
    // scoreO = 0;
    // scoreT = 0; 
    let [scoreX, scoreT, scoreO] = getLocalStorage("scores")
    xScoreNumber.innerText = scoreX;
    oScoreNumber.innerText =  scoreO;
    tieScoreNumber.innerText = scoreT;
}






const showBoard = () => {   
    displayScores()
    homePage.style.display="none";
    redoRectangle.style.display = "none";
    rectangle.style.display ="none";
    board.style.display="inline-block";
    localStorage.setItem("board","true")

    board.style.position = "absolute";  
    board.style.opacity = "1"; 
    board.style.zIndex ="1";   
    //setting initial scores to 0
    // displayInitialScores()
    playVsCpuListeners()
    startGame()  
    
}


//DISPLAYING THE HOME PAGE


const startGame = () => {   
   
    [xScoreNumber, oScoreNumber, tieScoreNumber].forEach((el, index) => el.innerText = [scoreX, scoreO, scoreT][index]);
    playerTurn.innerHTML =  xTurn+ "TURN";
    vsCpu.removeEventListener("click", showBoard)
    
    renderGame()      
}
let firstPlayer = playerX; 
//Starting the Game for Player vs Player
const renderGame = () => {  
    if(firstPlayer == playerO){
        playerTurn.innerHTML = oTurn + "TURN"
     }else{
        playerTurn.innerHTML = xTurn + "TURN"
     }
    
    origBoard = Array.from(Array(9).keys());    
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].style.removeProperty("background-color");        
        cells[i].addEventListener('click', turnClick, false);
 } 
 if (aiPlayer == playerX && aiPlayer == firstPlayer) {
   setTimeout(() => {
    
    turn(bestSpot(),aiPlayer)
    unClickableCells()
   },"300" ) ;
   clickableCells();
  }
  else if (aiPlayer == playerO && aiPlayer == firstPlayer) {
    setTimeout(() => {
     
     turn(bestSpot(),aiPlayer)
     unClickableCells()
    },"300" ) ;
    clickableCells();
   }
}
  
const turnClick = (square)=> {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) 
        setTimeout(() => {turn(bestSpot(), aiPlayer)
        unClickableCells()
        },"300") ;
        clickableCells();
	}
    
    hover()
}

const turn = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    playerTurn.innerHTML = (player == playerO) ? xTurn + "TURN" : oTurn + "TURN";

    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon);
    checkTie(); 
     
     
}

const checkWin = (board, player) => {
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


const gameOver = (gameWon) => {
	for (let index of winCombos[gameWon.index]) {
        const element = document.getElementById(index);
        if (gameWon.player === aiPlayer) {
          element.style.backgroundColor = (aiPlayer === playerO) ? "#F2B137" : "#31C3BD";
          element.innerHTML = (aiPlayer === playerO) ? playerOO : playerXX;
        } else {
          element.style.backgroundColor = (aiPlayer === playerX) ? "#F2B137" : "#31C3BD";
          element.innerHTML = (aiPlayer === playerX) ? playerXX : playerOO;
        }
      }
    // update scores
    if (gameWon.player == playerO) {
        scoreO++;
    } else if (gameWon.player == playerX) {
        scoreX++;}
    //  else if(gameWon.player !== playerX && gameWon.player !== playerO){
    //     scoreT++;
    // }
    

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameOver.player == huPlayer ? huPlayer+"TAKES THE ROUND" : aiPlayer+ "TAKES THE ROUND")
	//HANDLE WIN
    declareWinningMessage(gameOver.player == huPlayer ? "YOU WON!" : "OH NO, YOU LOST...")
}

let emptySquares = () => {
    return origBoard.filter(s => typeof s == "number");
}

const bestSpot = () => {
    return minimax(origBoard, aiPlayer).index;
}

const declareWinner = (who) => {
    rectangle.style.display = "block";
    table.style.zIndex = "-1";
    takes.innerHTML = who;
    const isAiWinner = who.includes(aiPlayer);
    const isTie = who.includes("TIE");
    takes.style.color = isTie ? "#A8BFC9" : (isAiWinner === (aiPlayer === playerO) ? "#F2B137" : "#31C3BD");
    
    
  };
  

const declareWinningMessage = (msg) => {
    winnerP.innerHTML = msg;
    if(msg === ""){
        scoreT++;
    }
    
}

const checkTie = () => {
    if (emptySquares().length == 0) {        
      cells.forEach(cell => cell.removeEventListener("click", turnClick, false));   
      declareWinner("ROUND TIED");
      declareWinningMessage("");  
        
      return true;
      
    } 
    
    return false;    
  };
  
const minimax = (newBoard, player) => {
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

const hover = () => {
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

const unClickableCells = () =>{
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', turnClick, false);
    }
}
const clickableCells = () =>{
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}
//QUIT GAME FUNCTION
let quitGame = () => {
    // removeInitialEffects()
   board.style.display ="none";
   rectangle.style.display ="none";
   [scoreX, scoreO, scoreT] = [0, 0, 0];
   defaultPlayerSelection()
   playGame() 
   

}

let cancelRestart = ()=>{
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";        
}

//RESTART GAME
let restartGame = () => {
    redoRectangle.style.display = "none";
    board.style.opacity = "1";
    [scoreX, scoreO, scoreT] = [0, 0, 0];
    firstPlayer = playerX;
    startGame();
  };
  
// What 
let nextRoundGame = () => { 
    setLocalStorage("scores",[scoreX, scoreT, scoreO])
    rectangle.style.display ="none";
    table.style.zIndex ="1";
    firstPlayer = firstPlayer === playerX ? playerO : playerX;
    updateScore()
    startGame()
   
    
}
//HANDLE RESET FUNCTION
let handleReset = () => {
    board.style.position = "absolute"
    board.style.opacity = "0.1";
    redoRectangle.style.cssText = "position: absolute; display: inline-block; top: 0; left: 0; z-index: 1;"; 
    // redoRectangle.classList.add("handle-reset");
    
}

let displayScores = () => {
    playerXscoreDisplay.innerHTML = aiPlayer === playerX ? "X(CPU)" : "X(YOU)";
    playerOscoreDisplay.innerHTML = aiPlayer === playerO ? "O(CPU)" : "O(YOU)";
  };

  let updateScore = () => {
    [xScoreNumber.innerText, oScoreNumber.innerText, tieScoreNumber.innerText] = [scoreX, scoreO, scoreT];
  };
playGame()

// window.onload = function(){
//     if(localStorage.getItem("board") === "true"){
//        showBoard()
//     }

// }


let playVsCpuListeners = () => {
    vsCpu.addEventListener("click",selectAPlayer)
    vsPlayer.addEventListener("click", selectAPlayer)
    // ADDING EVENT LISTENERS FOR VS-CPU
    redoBtn.addEventListener("click",handleReset)
    quitBtn.addEventListener("click", quitGame)
    cancelBtn.addEventListener('click', cancelRestart)
    restartBtn.addEventListener("click",restartGame)
    nextRoundBtn.addEventListener("click",nextRoundGame)

    //REMOVING EVENT LISTENERS OF MULTIPLAYER
    redoBtn.removeEventListener("click",handleResetVsPlayer)
    quitBtn.removeEventListener("click", quitGameVsPlayer)
    cancelBtn.removeEventListener('click', cancelRestartVsPlayer)
    restartBtn.removeEventListener("click",restartGameVsPlayer)
    nextRoundBtn.removeEventListener("click",nextRoundGameVsPlayer)
}
let playVsPlayerListeners = () => {
    vsCpu.addEventListener("click",selectAPlayer)
    vsPlayer.removeEventListener("click", selectAPlayer)
    // REMOVING EVENT LISTENERS OF vsCPU
    redoBtn.removeEventListener("click",handleReset)
    quitBtn.removeEventListener("click", quitGame)
    cancelBtn.removeEventListener('click', cancelRestart)
    restartBtn.removeEventListener("click",restartGame)
    nextRoundBtn.removeEventListener("click",nextRoundGame)

    // ADDING EVENTLISTENERS FOR MULTIPLAYER
    redoBtn.addEventListener("click",handleResetVsPlayer)
    quitBtn.addEventListener("click", quitGameVsPlayer)
    cancelBtn.addEventListener('click', cancelRestartVsPlayer)
    restartBtn.addEventListener("click",restartGameVsPlayer)
    nextRoundBtn.addEventListener("click",nextRoundGameVsPlayer)
}

// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ***********************************CODE FOR MULTIPLAYER****************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************



const showBoardVsPlayer = () => {   
    displayScoresVsPlayer()
    homePage.style.display="none";
    redoRectangle.style.display = "none";
    rectangle.style.display ="none";
    board.style.display="inline-block";
    localStorage.setItem("board","true")

    board.style.position = "absolute";  
    board.style.opacity = "1"; 
    board.style.zIndex ="1";   
    //setting initial scores to 0
    // displayInitialScores()
    playVsPlayerListeners()
    startGameVsPlayer()   
    
}



//DISPLAYING THE HOME PAGE


const startGameVsPlayer = () => {   
   
    [xScoreNumber, oScoreNumber, tieScoreNumber].forEach((el, index) => el.innerText = [scoreX, scoreO, scoreT][index]);
    playerTurn.innerHTML =  xTurn+ "TURN";
    
    vsCpu.removeEventListener("click", showBoardVsPlayer)
    
    renderGameVsPlayer()      
}

//Starting the Game for Player vs Player

const renderGameVsPlayer = () => {
    if(firstPlayer == playerO){
        playerTurn.innerHTML = oTurn + "TURN"
     }else{
        playerTurn.innerHTML = xTurn + "TURN"
     }
    
    origBoard = Array.from(Array(9).keys());  
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnClickVsPlayer , false); 
    }
}


let turnClickVsPlayer = (event) => {
    if(event.target.innerHTML !== "") return; // if the cell is not empty, do nothing
    turnVsPlayer(event.target.id, currentPlayer); // perform the turn for the clicked cell
    currentPlayer = currentPlayer === playerX ? playerO : playerX; // switch players
};




const turnVsPlayer = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    playerTurn.innerHTML = (player == playerO) ? xTurn + "TURN" : oTurn + "TURN";

    let gameWon = checkWinVsPlayer(origBoard, player)
    if (gameWon) gameOverVsPlayer(gameWon);
    
}

const checkWinVsPlayer = (board, player) => {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
    checkTieVsPlayer();
    firstPlayer = firstPlayer === playerX ? playerO : playerX;
	return gameWon;
}


const gameOverVsPlayer = (gameWon) => {
	for (let index of winCombos[gameWon.index]) {
        const element = document.getElementById(index);
        const player = gameWon.player;
        const isPlayer1O = player1 === playerO;
        element.style.backgroundColor = isPlayer1O === (player === player1) ? "#F2B137" : "#31C3BD";
        element.innerHTML = isPlayer1O === (player === player1) ? playerOO : playerXX;
        
      }
    // update scores
    if (gameWon.player == playerO) {
        scoreO++;
    } else if (gameWon.player == playerX) {
        scoreX++;
    } else{
        // scoreT++;
    }

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnVsPlayer, false);
	}
    declareWinnerVsPlayer(gameWon.player == playerO ? playerO + " TAKES THE ROUND" : playerX + " TAKES THE ROUND");

	//HANDLE WIN
    declareWinningMessageVsPlayer(gameWon.player == player1 && (player1 == playerX || player1 == playerO) ? "PLAYER 1 WINS" : "PLAYER 2 WINS");

}

let emptySquaresVsPlayer = () => {
    return origBoard.filter(s => typeof s == "number");
}



const declareWinnerVsPlayer = (who) => {
    rectangle.style.display = "block";
    table.style.zIndex = "-1";
    takes.innerHTML = who;
    
    const isWinner = who.includes(playerX);
    const isTie = who.includes("TIE");
    
    if (isTie) {
      takes.style.color = "#A8BFC9"; // gray color for tie
    } else {
      takes.style.color = isWinner ? "#31C3BD" : "#F2B137";
      // green color for playerX, yellow color for playerO
    }
    
  };
  

const declareWinningMessageVsPlayer = (msg) => {
    winnerP.innerHTML = msg;
}

 
const checkTieVsPlayer = () => {
    if (emptySquaresVsPlayer().length == 0) {       
      cells.forEach(cell => cell.removeEventListener("click", turnClickVsPlayer, false));
      declareWinnerVsPlayer("ROUND TIED");
      declareWinningMessageVsPlayer("");
      scoreT++        
      return true;
    } 
    
    return false;    
  };
  






//QUIT GAME FUNCTION
let quitGameVsPlayer = () => {
    // removeInitialEffects()
   board.style.display ="none";
   rectangle.style.display ="none";
   firstPlayer = playerX; 
   [scoreX, scoreO, scoreT] = [0, 0, 0];
   defaultPlayerSelection()
   playGame() 
}

let cancelRestartVsPlayer = ()=>{
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";        
}

//RESTART GAME
let restartGameVsPlayer = () => {
    redoRectangle.style.display = "none";
    board.style.opacity = "1";
    [scoreX, scoreO, scoreT] = [0, 0, 0];
    firstPlayer = playerX;
    startGameVsPlayer();
  };
  

let nextRoundGameVsPlayer = () => { 
    setLocalStorage("scores",[scoreX, scoreT, scoreO])
    rectangle.style.display ="none";
    table.style.zIndex ="1"
    updateScoreVsPlayer()
    startGameVsPlayer()
    
}
//HANDLE RESET FUNCTION
let handleResetVsPlayer = () => {
    board.style.position = "absolute"
    board.style.opacity = "0.1";
    redoRectangle.style.cssText = "position: absolute; display: inline-block; top: 0; left: 0; z-index: 1;"; 
    // redoRectangle.classList.add("handle-reset");
    
}

let displayScoresVsPlayer = () => {
    playerXscoreDisplay.innerHTML = player1 === playerX ? "X(P1)" : "X(P2)";
    playerOscoreDisplay.innerHTML = player1 === playerO ? "O(P1)" : "O(P2)";
  };

  let updateScoreVsPlayer = () => {
    [xScoreNumber.innerText, oScoreNumber.innerText, tieScoreNumber.innerText] = [scoreX, scoreO, scoreT];
  }

  