const answer = document.querySelector('#answer');
const digit1 = document.querySelector('#digit1');
const digit2 = document.querySelector('#digit2');
const alertText = document.querySelector('#alert');
const alertContainer = document.querySelector('#container');
const streak = document.querySelector('#streak');
const streakContainer = document.querySelector('#streak-container');
const appOption = document.querySelector('#appOption');
const operator = document.querySelector('#operator');

document.querySelector('#appOption').addEventListener('input', checkOperator);
document.querySelector('#checkAnswer').addEventListener('click', verify);

let firstDigit;
let secondDigit;
let thirdDigit;
let streakCounter = 0;

function checkOperator() {
  switch (true) {
    case appOption.value === 'multiply':
      multiply();
      break;
    case appOption.value === 'divide':
      divide();
      break;
    default:
  }
}

function multiply() {
  firstDigit = Math.floor(Math.random() * 16);
  secondDigit = Math.floor(Math.random() * 16);

  digit1.innerText = firstDigit;
  digit2.innerText = secondDigit;

  answer.value = 0;
  streak.innerText = streakCounter;
  operator.innerText = '*';
}

function divide() {
  firstDigit = Math.floor(Math.random() * 14) + 1;
  secondDigit = Math.floor(Math.random() * 14) + 1;
  thirdDigit = firstDigit * secondDigit;

  digit1.innerText = thirdDigit;
  digit2.innerText = secondDigit;

  answer.value = 0;
  streak.innerText = streakCounter;
  operator.innerText = '\u00f7';
}

function verify() {
  switch (true) {
    case appOption.value === 'multiply':
      if (+answer.value === firstDigit * secondDigit) {
        alertText.className = 'correct-show';
        alertText.innerText = '\u2713';
        alertContainer.className = 'container-correct';
        streakCounter += 1;
        if (streakCounter > 24) {
          streakContainer.className = 'streak-container-diamond';
        } else if (streakCounter > 9 && streakCounter < 25) {
          streakContainer.className = 'streak-container-gold';
        } else {
          streakContainer.className = 'streak-container';
        }
        streak.innerText = streakCounter;
        setTimeout(newNumbers, 3000);
      } else {
        alertText.className = 'wrong-show';
        alertText.innerText = 'X';
        alertContainer.className = 'container-wrong';
        streakCounter = 0;
        streak.innerText = streakCounter;
        streakContainer.className = 'streak-container';
      }
      break;
    case appOption.value === 'divide':
      if (+answer.value === thirdDigit / secondDigit) {
        alertText.className = 'correct-show';
        alertText.innerText = '\u2713';
        alertContainer.className = 'container-correct';
        streakCounter += 1;
        if (streakCounter > 24) {
          streakContainer.className = 'streak-container-diamond';
        } else if (streakCounter > 9 && streakCounter < 25) {
          streakContainer.className = 'streak-container-gold';
        } else {
          streakContainer.className = 'streak-container';
        }
        streak.innerText = streakCounter;
        setTimeout(newNumbers, 3000);
      } else {
        alertText.className = 'wrong-show';
        alertText.innerText = 'X';
        alertContainer.className = 'container-wrong';
        streakCounter = 0;
        streak.innerText = streakCounter;
        streakContainer.className = 'streak-container';
      }
      break;
    default:
  }
}

function newNumbers() {
  if (appOption.value === 'multiply') {
    alertText.className = 'alert';
    alertContainer.className = 'container';
    multiply();
  } else {
    alertText.className = 'alert';
    alertContainer.className = 'container';
    divide();
  }
}

multiply();
