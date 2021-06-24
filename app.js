let min = 1,
	max = 20,
	guessAttempt = 5,
	correctGuess = generateWinningNumber(min, max);

// UI Elements
const gameBoard = document.querySelector('#game');
const minValue = document.querySelector('.min-num');
const maxValue = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessButton = document.querySelector('#guess-btn');
const guessNotification = document.querySelector('.message');

// Setting Min and Max Values
minValue.innerText = min;
maxValue.innerText = max;

gameBoard.addEventListener('mousedown', function (e) {
	if (e.target.classList.contains('re-attempt')) {
		window.location.reload();
	}
});

guessButton.addEventListener('click', guessEngine);

function guessEngine() {
	guessValue = parseInt(guessInput.value);

	let message;

	if (isNaN(guessValue) || guessValue < min || guessValue > max) {
		message = 'Please enter a value between the specified range';
		let color = 'red';
		setNotification(message, color);
		return;
	}

	if (guessValue === correctGuess) {
		message = `Nice! you guessed right, ${guessValue} is correct`;
		color = 'green';
		guessButton.value = 'Try Again';
		guessButton.classList.remove('button-primary');
		guessButton.classList.add('re-attempt');
		gameOver(message, color);
	} else {
		guessAttempt -= 1;

		if (guessAttempt === 0) {
			message = `Sorry! you guessed wrong, ${guessValue} is isn't the correct value. Game Over!`;
			color = 'red';
			guessButton.value = 'Try Again';
			guessButton.classList.remove('button-primary');
			guessButton.classList.add('re-attempt');
			gameOver(message, color);
		} else {
			message = `Sorry! you guessed wrong, you have ${guessAttempt} guesses left`;
			color = 'orange';
			guessInput.value = '';
			gameOver(message, color);
		}
	}
}

function gameOver(message, color) {
	color === 'orange'
		? (guessInput.disabled = false)
		: (guessInput.disabled = true);

	guessInput.style.borderColor = color;
	guessInput.style.borderWidth = '2px';
	setNotification(message, color);
}

function setNotification(value, color) {
	guessNotification.innerText = value;
	guessNotification.style.color = color;
	guessNotification.style.fontSize = '1.3rem';
}

function generateWinningNumber(min, max) {
	return Math.floor(Math.random() * max) + min;
}
