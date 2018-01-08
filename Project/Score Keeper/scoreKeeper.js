/*
 * use method getElementById() getElementByClass() getElementByTag()
 * querySelector() querySelectorAll() to select
 */
var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");
var winningScore = 5;
var p1Score = 0;
var p2Score = 0;
var gameOver = false;

// use method addEventListener() to add an event
p1Button.addEventListener("click", function() {
	if (!gameOver) {
		p1Score++;
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("winner");
		}
		p1Display.textContent = p1Score;
	}	
})

p2Button.addEventListener("click", function() {
	if (!gameOver) {
		p2Score++;
		if (p2Score === winningScore) {
			gameOver = true;
			// use CSS to make change easier
			p2Display.classList.add("winner");
		}
		p2Display.textContent = p2Score;
	}
})

resetButton.addEventListener("click", reset);

function reset() {
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
}

numInput.addEventListener("change", function() {
	// numInput.value is a string, so we should method Number() to change it to a number
	winningScore = Number(numInput.value);
	winningScoreDisplay.textContent = numInput.value;
	reset();
})