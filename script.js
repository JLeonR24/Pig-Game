'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
	// Counters
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	// Starting conditions
	diceEl.classList.add('hidden');
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	// Active Player
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
};

init();

//Refactor Switch
const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0; // Switch to next player
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// Generate random dice roll
btnRollDice.addEventListener('click', function () {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;
		diceEl.src = `images/dice-${dice}.png`;
		diceEl.classList.remove('hidden');

		if (dice !== 1) {
			currentScore += dice; // Add dice to current score
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

// Hold button
btnHold.addEventListener('click', function () {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		// Check Winner
		if (scores[activePlayer] >= 100) {
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
			diceEl.classList.add('hidden');
			alert(`Player ${activePlayer + 1} Wins`);
		} else {
			switchPlayer();
		}
	}
});

// NewGame button
btnNewGame.addEventListener('click', init);
