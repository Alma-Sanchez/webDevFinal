/*global console, Audio */

var triangleGenerator = (function () {
    "use strict";
    var triangle = {},          // The object to be returned.
        color = "#009900",
        canvasLength,
        xStart,
        yStart,
        canvas,
        context;

    function clear() {
        context.clearRect(0, 0, canvasLength, canvasLength);
    }

    triangle.type = "triangle";

    triangle.draw = function () {
        clear();
        context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = "darkgray";
        context.fillStyle = color;
        // Draw the bottom of the triangle.
        context.moveTo(xStart, yStart);
        context.lineTo(canvasLength - xStart, yStart);
        // Draw to the top of the triangle.
        context.lineTo(canvasLength / 2, canvasLength - yStart);
        // Draw back to the start.
        context.lineTo(xStart, yStart);
        // Draw to the second position again, to complete the stroke border.
        context.lineTo(canvasLength - xStart, yStart);
        context.stroke();
        context.fill();
    };

    triangle.init = function (pCanvas) {
        canvas = pCanvas;
        canvasLength = canvas.width;
        context = canvas.getContext("2d");
        yStart = canvasLength / 1.25;
        xStart = canvasLength - yStart;
    };

    return triangle;
}());

var circleGenerator = (function () {
    "use strict";
    var circle = {},
        radius,
        canvas,
        context,
        color = "#ff9933";

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.width);
    }

    circle.type = "circle";

    circle.draw = function () {
        clear();
        context.beginPath();
        context.lineWidth = "2";
        context.fillStyle = color;
        context.strokeStyle = "darkgray";
        context.arc(canvas.width / 2, canvas.width / 2, radius, 0, 360);
        context.fill();
        context.stroke();
    };

    circle.init = function (pCanvas) {
        canvas = pCanvas;
        context = canvas.getContext("2d");
        radius = canvas.width / 1.25 / 2.5;
    };

    return circle;
}());

var rectangleGenerator = (function () {
    "use strict";
    var rectangle = {},
        canvas,
        context,
        color = "#9933ff";

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.width);
    }

    rectangle.type = "rectangle";

    rectangle.draw = function () {
        var length = canvas.width * 0.6,
            start = canvas.width / 2 - length / 2;
        clear();
        context.strokeStyle = "darkgray";
        context.lineWidth = "2";
        context.fillStyle = color;
        context.fillRect(start - 1, start - 1, length + 2, length + 2);
        context.fillRect(start, start, length, length);
    };

    rectangle.init = function (pCanvas) {
        canvas = pCanvas;
        context = canvas.getContext("2d");
    };

    return rectangle;
}());

var sameShape = (function () {
    "use strict";

    /* PRIVATE VARIABLES */
    var sameshape = {},                 // The module object to be returned.
        // Game state items.
        isPlaying = false,
        lastShape,
        currentShape,
        basePoints = 10,
        // Objects for referencing.
        board,
        timer,
        yesButton,
        noButton,
        canvas,
        startButton,
        gameElements = [],              // An array that holds all board children.
        shapeGenerators = [],           // An array that holds each shape generator.
        // SOUNDS.
        correctPing = new Audio('../sounds/correctDing.mp3'),
        incorrectPing = new Audio('../sounds/incorrect.wav'),
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
        canvasLength,
        buttonOffset = 10;              // How many pixels between board edges and buttons

    /* PRIVATE FUNCTIONS */

    function findChildrenSizes() {
        // Timer.
        timerHeight = boardHeight / 10;
        timerWidth = boardWidth / 3;
        // Button.
        buttonWidth = boardWidth / 2 - 4 * buttonOffset;
        buttonHeight = boardHeight / 5;
        // Canvas.
        canvasLength = buttonWidth * 1.25;
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
        // Canvas.
        canvas.width = canvasLength;
        canvas.height = canvasLength;
    }

    function resetTimerText() {
        var text = document.getElementById("timerText");
        text.textContent = "1:00";
    }

    function addGameElementsToBoard() {
        var i;
        for (i = 0; i < gameElements.length; i += 1) {
            board.appendChild(gameElements[i]);
        }
    }

    function createStartButton() {
        var button = document.createElement("div"),
            buttonText = document.createElement("p"),
            width = boardWidth - 12 * buttonOffset,
            height = boardHeight / 4 - 10,
            top = boardHeight / 2 - height / 2 - boardHeight / 12,
            left = boardWidth / 2 - width / 2;
        // Setup the button text.
        buttonText.classList.add("center", "text");
        buttonText.textContent = "START";
        buttonText.style.lineHeight = (height - 2) + "px";
        buttonText.style.fontSize = (height - 2) + "px";
        // Setup the button.
        button.classList.add("gameElement");
        button.id = "startButton";
        button.style.width = width + "px";
        button.style.height = height + "px";
        button.style.top = top + "px";
        button.style.left = left + "px";
        // Add them to the DOM.
        button.appendChild(buttonText);
        gameElements.push(button);
        // We want to start the game when the start button is clicked, what a surprise.
        button.onclick = sameshape.startGame;
        startButton = button;
    }

    function createMultiplier() {
        var mult = document.createElement("div"),
            mulText = document.createElement("p"),
            width = boardWidth / 4,
            height = boardHeight / 8,
            top = boardHeight / 30,
            left = boardWidth / 30;

        // Setup the multiplier text;
        mulText.classList.add("center", "text");
        mulText.id = "mulText";
        mulText.textContent = "x0";
        mulText.style.lineHeight = (height - 2) + "px";
        mulText.style.fontSize = (height - 2) + "px";
        // Setup the div.
        mult.classList.add("gameElement");
        mult.style.width = width + "px";
        mult.style.height = height + "px";
        mult.style.top = top + "px";
        mult.style.left = left + "px";
        // DOM management.
        mult.appendChild(mulText);
        gameElements.push(mult);
    }

    function createScore() {
        var score = document.createElement("div"),
            text = document.createElement("p"),
            width = boardWidth / 4,
            height = boardHeight / 8,
            top = boardHeight / 30,
            left = boardWidth - (boardWidth / 30 + width);

        // Setup the score text.
        text.classList.add("center", "text");
        text.id = "scoreText";
        text.textContent = "0";
        text.style.lineHeight = (height) + "px";
        text.style.fontSize = (height - 2) + "px";
        // Setup the div.
        score.classList.add("gameElement");
        score.style.width = width + "px";
        score.style.height = height + "px";
        score.style.top = top + "px";
        score.style.left = left + "px";
        // DOM management.
        score.appendChild(text);
        gameElements.push(score);
    }

    function getScoreValue() {
        var textElement = document.getElementById("scoreText"),
            text = textElement.textContent,
            value = parseInt(text, 10);
        return value;
    }

    function setScoreValue(pValue) {
        var textElement = document.getElementById("scoreText");
        textElement.textContent = pValue.toString();
    }

    function addToScore(pValue) {
        var value = getScoreValue();
        value += pValue;
        setScoreValue(value);
    }

    function getMultiplierValue() {
        var textElement = document.getElementById("mulText"),
            text = textElement.textContent,
            value = parseInt(text.substring(1), 10);
        return value;
    }

    function setMultiplierValue(pValue) {
        var textElement = document.getElementById("mulText");
        textElement.textContent = "x" + pValue;
    }

    function addToMultiplier() {
        var value = getMultiplierValue();
        value = value < 10 ? value + 1 : value;
        setMultiplierValue(value);
    }

    function drawRandomShape() {
        var randomIndex = Math.floor(Math.random() * shapeGenerators.length),
            randomGenerator = shapeGenerators[randomIndex];
        randomGenerator.draw();
        return randomGenerator.type;
    }

    function nextShape() {
        lastShape = currentShape;
        currentShape = drawRandomShape();
    }

    function createGameElements() {
        var timerText,
            multiplierText,
            scoreText,
            yesButtonText,
            noButtonText;

        createStartButton();
        createMultiplier();
        createScore();
        // Timer.
        timer = document.createElement("div");
        timer.id = "timer";
        timer.classList.add("center", "gameElement");
        // Timer's text.
        timerText = document.createElement("p");
        timerText.id = "timerText";
        timerText.classList.add("text", "center");
        timerText.style.lineHeight = timerHeight + "px";
        timerText.style.fontSize = (timerHeight - 2) + "px";
        timer.appendChild(timerText);
        board.appendChild(timer);
        resetTimerText();
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
        yesButton.onclick = function () {
            var scoreValue;
            if (isPlaying) {
                if (currentShape === lastShape) {
                    correctPing.play();
                    addToMultiplier();
                    scoreValue = basePoints * getMultiplierValue();
                    addToScore(scoreValue);
                } else {
                    incorrectPing.play();
                    setMultiplierValue(1);
                }
                nextShape();
            }
        };

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
        noButton.onclick = function () {
            var scoreValue;
            if (isPlaying) {
                if (currentShape !== lastShape) {
                    correctPing.play();
                    addToMultiplier();
                    scoreValue = basePoints * getMultiplierValue();
                    addToScore(scoreValue);
                } else {
                    incorrectPing.play();
                    setMultiplierValue(1);
                }
                nextShape();
            }
        };

        board.appendChild(noButton);
        // Canvas.
        canvas = document.createElement("canvas");
        canvas.id = "shapeCanvas";
        canvas.classList.add("gameCanvas", "gameElement");
        board.appendChild(canvas);
    }

    function setGameElementPositions() {
        var timerTop,
            timerLeft,
            buttonTop,
            yesButtonLeft,
            noButtonLeft,
            canvasTop,
            canvasLeft,
            multiplierTop,
            multiplierLeft,
            scoreTop,
            scoreLeft;

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

        canvasTop = (boardHeight / 2 - buttonOffset * 2 - canvasLength / 2) + "px";
        canvasLeft = (boardWidth / 2 - canvasLength / 2) + "px";
        canvas.style.top = canvasTop;
        canvas.style.left = canvasLeft;
    }

    function initShapes() {
        triangleGenerator.init(canvas);
        circleGenerator.init(canvas);
        rectangleGenerator.init(canvas);
        shapeGenerators.push(triangleGenerator, circleGenerator, rectangleGenerator);
    }

    function onTimeExpired() {
        var score = getScoreValue();
        isPlaying = false;
        setScoreValue(0);
        canvas.getContext("2d").clearRect(0, 0, canvasLength, canvasLength);
        window.alert("Your time has expired.\nYour score was: " + score.toString());
        board.appendChild(startButton);
    }

    function clockTickDown() {
        var timerText = document.getElementById("timerText"),
            timerValue,
            splitTime;

        splitTime = timerText.textContent.split(":");
        timerValue = splitTime[0] === "1" ? 60 : parseInt(splitTime[1], 10);
        timerValue -= 1;
        if (-1 === timerValue) {
            onTimeExpired();
        } else {
            timerText.textContent = timerValue > 9 ? "0:" + timerValue : "0:0" + timerValue;
            // Call clockTickDown after another second.
            setTimeout(clockTickDown, 1000);
        }
    }

    function startTimer() {
        resetTimerText();
        // Call clockTickDown every second.
        setTimeout(clockTickDown, 1000);
        isPlaying = true;
    }


    sameshape.startGame = function () {
        board.removeChild(startButton);
        nextShape();
        // Allow 2 seconds before drawing the first shape and starting the timer.
        setTimeout(nextShape, 1000);
        setTimeout(startTimer, 1000);
    };

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
        board.classList.add("center");
        sameshape.setBoardSize(pBoardWidth, pBoardHeight);
        createGameElements();
        setChildrenSizes();
        setGameElementPositions();
        addGameElementsToBoard();
        initShapes();
    };

    return sameshape;
}());

window.onload = function () {
    "use strict";
    var boardID = "board";
    sameShape.init(boardID, 900, 900);
};
