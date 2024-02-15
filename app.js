const answer = document.querySelector('#answer');
const digit1 = document.querySelector('#digit1');
const digit2 = document.querySelector('#digit2');
const streak = document.querySelector('#streak');
const streakTitle = document.querySelector('#streakTitle');
const streakContainer = document.querySelector('#streakContainer');
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
        streakCounter += 1;
        streakContainer.className =
          'box has-text-centered has-background-success';
        streakTitle.innerText = 'Answer';
        streak.innerText = '\u2714';
      } else {
        streakCounter = 0;
        streakContainer.className =
          'box has-text-centered has-background-danger';
        streakTitle.innerText = 'Answer';
        streak.innerText = '\u2716';
      }
      setTimeout(newNumbers, 2000);
      setTimeout(resetStreakContainer, 2000);
      break;
    case appOption.value === 'divide':
      if (+answer.value === thirdDigit / secondDigit) {
        streakCounter += 1;
        streakContainer.className =
          'box has-text-centered has-background-success';
        streakTitle.innerText = 'Answer';
        streak.innerText = '\u2714';
      } else {
        streakCounter = 0;
        streakContainer.className =
          'box has-text-centered has-background-danger';
        streakTitle.innerText = 'Answer';
        streak.innerText = '\u2716';
      }
      setTimeout(newNumbers, 2000);
      setTimeout(resetStreakContainer, 2000);
      break;
    default:
  }
}

function newNumbers() {
  if (appOption.value === 'multiply') {
    multiply();
  } else {
    divide();
  }
}

function resetStreakContainer() {
  streakContainer.className = 'box has-text-centered';
  streakTitle.innerText = 'Streak';
  streak.innerText = streakCounter;
}

multiply();
