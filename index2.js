const showBoardVsPlayer = () => {   
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
    
    startGame()   
    
}