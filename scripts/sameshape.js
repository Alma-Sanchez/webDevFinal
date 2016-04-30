/*global console */

var sameShape = (function () {
    "use strict";
    
    /* PRIVATE VARIABLES */
    var sameshape = {},
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
        buttonOffset = 10;          // How many pixels between board edges and buttons
    
    /* PRIVATE FUNCTIONS */
    
    function setChildrenSizes() {
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
        setChildrenSizes();
    };
    
    sameshape.init = function (pBoardWidth, pBoardHeight) {
        sameshape.setBoardSize(pBoardWidth, pBoardHeight);
    };
    
    return sameshape;
}());

window.onload = function () {
    "use strict";
    sameShape.init(300, 300);
};