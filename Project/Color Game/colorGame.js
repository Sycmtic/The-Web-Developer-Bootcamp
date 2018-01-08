// use to let reset botton know how many squares need to reset
var numSquares = 6;
// the colors of squares 
var colors = [];
// the color that picked from colors array
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

// initialize the game
function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	// mode buttons event listeners
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			// change the selected class 
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
	// add click listeners to squares
		squares[i].addEventListener("click", function() {
		// grab color of picked color then compare it to pickedColor
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(pickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	} 
}

/*
 * figure out how many squares to show
 * pick new colors
 * pick a new pickedColor
 * update page to reflect changes
 */
function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	// at the beginning there is no message 
	messageDisplay.textContent = "";
	// change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			// make squares appear
			squares[i].style.display = "block";
			// add intial colors to squares: pay attention to use backgroundColor instead of background 
			squares[i].style.backgroundColor = colors[i];
		} else {
			// hide the squares
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

// easyBtn.addEventListener("click", function() {
// 	this.classList.add("selected");
// 	hardBtn.classList.remove("selected");

// 	numSquares = 3
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		// colors only have 3 elements here
// 		if (colors[i]) {
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hardBtn.addEventListener("click", function() {
// 	this.classList.add("selected");
// 	easyBtn.classList.remove("selected");

// 	numSquares = 6
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		// colors only have 6 elements here
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })

// set the reset button
resetButton.addEventListener("click", reset);

/* 
 * When guess correctly:
 * loop through all squares
 * change each color to match given color
 */
function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

/* 
 * pick a random color in colors array
 */
function pickColor() {
	// use Math.random() to get a random number [0, 1)
	// use Math.floor to get rid of the decimal
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// generate a set of colors of given number
function generateRandomColors(num) {
	// make a array 
	var arr = [];
	// add num random colors to array
	for (var i = 0; i < num; i++) {
		// get random color and puch into arr
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

// get a random color and return it as a rgb string
function randomColor() {
	// pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	// pay attention to add space between rgb to match CSS style
	return "rgb(" + r + ", " + g + ", " + b + ")";
}