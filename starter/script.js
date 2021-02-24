'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerBackground = document.querySelectorAll('.player');
const finalScores = [0, 0];
let currentScoreActive = 0;
let activePlayer = 0;
let isPlaying = false;

// set everything back to 0 and restert the game
const restart = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add('hidden');
  activePlayer = 0;
  isPlaying = true;
};

//switchPlayer
function switchPlayer() {
  currentScoreActive = 0;
  document.querySelector(
    '#current--' + activePlayer
  ).textContent = currentScoreActive;
  playerBackground[activePlayer].classList.remove('player--active');
  activePlayer = activePlayer == 0 ? 1 : 0;
  playerBackground[activePlayer].classList.add('player--active');
}

function check() {
  console.log(finalScores[activePlayer]);
  console.log(finalScores[activePlayer] + '  ' + activePlayer);
  if (finalScores[activePlayer] >= 100) {
    document.querySelector('#score--' + activePlayer).textContent =
      'Congrats, you have won';
    isPlaying = false;
    dice.classList.add('hidden');
  } else {
    document.querySelector('#score--' + activePlayer).textContent =
      finalScores[activePlayer];
  }
}

//rolling the dice
const roll = function () {
  if (isPlaying) {
    //generating  a random roll
    let rolledNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(rolledNumber);
    dice.src = 'dice-' + rolledNumber + '.png';
    dice.classList.remove('hidden');

    if (rolledNumber == 1) {
      //current score 0 next player

      switchPlayer();
      // switchPlayer();
    } else {
      // add to current score
      currentScoreActive += rolledNumber;
      document.querySelector(
        '#current--' + activePlayer
      ).textContent = currentScoreActive;
    }
  }
};
//hold the score
const hold = function () {
  if (isPlaying) {
    finalScores[activePlayer] += currentScoreActive;
    //check if won
    check();

    switchPlayer();
  }
};

btnNew.addEventListener('click', restart);
//roll the dice
console.log(isPlaying);

btnRoll.addEventListener('click', roll);

btnHold.addEventListener('click', hold);
