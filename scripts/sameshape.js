/*global console */

var sameShape = (function () {
    "use strict";
    
    /* PRIVATE VARIABLES */
    var sameshape = {},                 // The module object to be returned.
        // Objects for referencing.
        board,
        timer,
        yesButton,
        noButton,
        // Size variables.
        boardHeight,
        boardWidth,
        minBoardWidth = 300,
        minBoardHeight = 300,
        maxBoardWidth = 900,
        maxBoardHeight = 900,
        timerHeight,
        timerWidth,
        timerValue,
        buttonHeight,
        buttonWidth,
        buttonOffset = 10;              // How many pixels between board edges and buttons
    
    /* PRIVATE FUNCTIONS */
    
    function findChildrenSizes() {
        // Timer.
        timerHeight = boardHeight / 10;
        console.log("timerHeight is: " + timerHeight);
        timerWidth = boardWidth / 3;
        console.log("timerWidth is: " + timerWidth);
        // Button.
        buttonWidth = boardWidth / 2 - 4 * buttonOffset;
        console.log("buttonWidth is: " + buttonWidth);
        buttonHeight = boardHeight / 5;
        console.log("buttonHeight is: " + buttonHeight);
    }
    
    
    function setChildrenSizes() {
        // Timer.
        timer.style.width = timerWidth + "px";
        timer.style.height = timerHeight + "px";
        // Yes button.
        yesButton.style.width = buttonWidth + "px";
        yesButton.style.height = buttonHeight + "px";
        // No button.
        noButton.style.width = buttonWidth + "px";
        noButton.style.height = buttonHeight + "px";
    }
    
    
    function createGameElements() {
        var timerText,
            multiplierText,
            scoreText,
            yesButtonText,
            noButtonText;
        // Timer.
        timer = document.createElement("div");
        timer.id = "timer";
        timer.classList.add("center", "gameElement");
        // Timer's text.
        timerText = document.createElement("p");
        timerText.textContent = "1:00";
        timerText.classList.add("text", "center");
        timerText.style.lineHeight = timerHeight + "px";
        timerText.style.fontSize = (timerHeight - 2) + "px";
        timer.appendChild(timerText);
        board.appendChild(timer);
        // Yes button.
        yesButton = document.createElement("div");
        yesButton.id = "yesButton";
        yesButton.classList.add("gameElement");
        // Yes button's text.
        yesButtonText = document.createElement("p");
        yesButtonText.textContent = "YES";
        yesButtonText.classList.add("text", "center");
        yesButtonText.style.lineHeight = buttonHeight + "px";
        yesButtonText.style.fontSize = (buttonHeight - 2) + "px";
        yesButton.appendChild(yesButtonText);
        board.appendChild(yesButton);
        // No button.
        noButton = document.createElement("div");
        noButton.id = "noButton";
        noButton.classList.add("gameElement");
        // No button's text.
        noButtonText = document.createElement("div");
        noButtonText.textContent = "NO";
        noButtonText.classList.add("text", "center");
        noButtonText.style.lineHeight = buttonHeight + "px";
        noButtonText.style.fontSize = (buttonHeight - 2) + "px";
        noButton.appendChild(noButtonText);
        board.appendChild(noButton);
    }
    
    
    function setGameElementPositions() {
        var timerTop,
            timerLeft,
            buttonTop,
            yesButtonLeft,
            noButtonLeft,
            multiplierTop,
            multiplierLeft,
            scoreTop,
            socreLeft;
        
        timerTop = (boardHeight / 30) + "px";
        timerLeft = (boardWidth / 2 - timerWidth / 2) + "px";
        
        buttonTop = (boardHeight - buttonHeight - buttonOffset * 3) + "px";
        buttonOffset = (boardWidth / 4 - buttonWidth / 2);
        
        yesButton.style.top = buttonTop;
        yesButton.style.left = buttonOffset + "px";
        noButton.style.top = buttonTop;
        noButton.style.left = (boardWidth / 2 + buttonOffset) + "px";
        
        timer.style.top = timerTop;
        timer.style.left = timerLeft;
        console.log(timer.style.top + " " + timer.style.left);
    }
    
    /**
     * Initializes the board size.  Function must be called at least once before the game can be played.
     * @param {number} pWidth  The width, in pixels of the board's div.
     * @param {number} pHeight The height, in pixels, of the board's div.
     */
    sameshape.setBoardSize = function (pWidth, pHeight) {
        // Do no allow for less than 100 pixel width or height.
        boardWidth = pWidth > minBoardWidth ? pWidth : minBoardWidth;
        boardHeight = pHeight > minBoardHeight ? pHeight : minBoardHeight;
        // Do not allow for more than max width and max height.
        boardWidth = boardWidth > maxBoardWidth ? maxBoardWidth : boardWidth;
        boardHeight = boardHeight > maxBoardHeight ? maxBoardHeight : boardHeight;
        board.style.width = boardWidth + "px";
        board.style.height = boardHeight + "px";
        findChildrenSizes();
    };
    
    sameshape.init = function (boardID, pBoardWidth, pBoardHeight) {
        board = document.getElementById(boardID);
        sameshape.setBoardSize(pBoardWidth, pBoardHeight);
        createGameElements();
        setChildrenSizes();
        setGameElementPositions();
    };
    
    return sameshape;
}());

window.onload = function () {
    "use strict";
    var boardID = "board";
    
    sameShape.init(boardID, 400, 300);
};