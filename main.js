/*
  HTML to inject into the index.html file.  Injection point is the div with the id of 'app'.
*/
document.querySelector('#app').innerHTML = `
<div class="container">
    <h1 class="is-size-1 has-text-centered mb-4">Practice Your Arithmetic</h1>
    <div class="is-flex is-justify-content-center">
        <button class="button is-size-5 is-info px-6" id="startBtn">Start</button>
    </div>

    <div class="section">
        <div class="card has-background-grey-darker mb-4">
            <div class="card-content">
                <div class="content">
                    <p id="problem" class="is-size-2 has-text-centered"></p>
                </div>
            </div>
        </div>

        <div class="field mb-4">
            <label class="label is-size-4">Guess</label>
            <div class="control">
                <input id="guess" class="input" type="text" placeholder="What's the answer?">
            </div>
        </div>

        <div class="field is-grouped is-justify-content-center mb-4">
            <div class="control">
                <button class="button is-warning" id="answerBtn">Check</button>
            </div>
        </div>

        <div id="answerContainer" class="card has-background-grey-darker mb-4">
            <div class="card-content">
                <div class="content">
                    <label class="label is-size-4">Answer</label>
                    <p id="answerText" class="is-size-2 has-text-centered"></p>
                </div>
            </div>
        </div>

        <div class="has-text-centered mb-4">
            <label class="label is-size-4">Score</label>
        </div>
        <div class="card has-background-grey-darker">
            <div class="card-content">
                <div class="content">
                    <p id="streak" class="is-size-2 has-text-centered">0</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
/*
  Game object is global and contains the state for the game.  Currently not being saved locally, so game will reset on page refresh.

  State: Can be 'not started', 'in progress', or 'end'

  Operation: Can be 'multiplication' or 'division'.  Currently not being used, but will be used to in the future to generate multiplication or division problems.

  Questions: The number of problems generated.

  CorrectGuesses: The number of correct guesses made.  This is used to determine the score.

  Answers: An array that holds the answers to the generated problems.

  Guesses: An array that holds the guesses made by the user
*/
const game = {
  state: 'not started',
  operation: null,
  questions: 0,
  correctGuesses: 0,
  answers: [],
  guesses: [],
};
/*
  Consts for HTML elements
*/
const problem = document.querySelector('#problem');
const operator = document.querySelector('#operation');
const uncheckedGuess = document.querySelector('#guess');
const startBtn = document.querySelector('#startBtn');
const answerBtn = document.querySelector('#answerBtn');
const answerContainer = document.querySelector('#answerContainer')
const answerText = document.querySelector('#answerText')
const streak = document.querySelector('#streak');
/*
  Event Listeners
*/
startBtn.addEventListener('click', function () {
  if (game.state === 'not started' || game.state === 'end') {
    startGame(game.operation);
  } else return
});

answerBtn.addEventListener('click', function () {
  if (!uncheckedGuess.value) {
    return
  } else
  logGuess(+uncheckedGuess.value);
  const success = validate(game.answers, game.guesses);
  resolver(success);
});
/* 
  Function generates two random integers between 1-15, multiplies the two integers together, and returns both integers and the product.
*/
function generateInts() {
  const firstNum = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
  const secondNum = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
  const product = firstNum * secondNum;
  return { firstNum, secondNum, product };
}
/*
  Function does the following:
  1. Increments the questions value on the game object by 1.
  2. Calls the generateInts function.
  3. Creates an answer object with id and value properties.
  4. Checks the parameters for a value other than 'multiplication'.
     4a. Default behavior is a multiplication problem and answer are created.
     4b. If a value other than 'multiplication', a division problem and answer are created.
  5. The answer is returned
*/
function generateProblem(operation = 'multiplication') {
  game.questions += 1;
  const { firstNum, secondNum, product } = generateInts();
  const answer = {
    id: game.questions,
    value: null,
  };
  if (operation != 'multiplication') {
    problem.innerText = `${product} / ${firstNum}`;
    answer.value = secondNum;
  } else {
    problem.innerText = `${firstNum} * ${secondNum}`;
    answer.value = product;
  }
  return answer;
}
/*
  Function takes in a number, then creates a guess object with id, value and validation properties.  After the guess is created, it is pushed to the guesses array in the game object.
*/
function logGuess(num) {
  const guess = {
    id: game.questions,
    value: num,
    validation: null,
  };
  game.guesses.push(guess);
}
/*
  Function runs two for loops:
    1. The first for loop compares the objects in the answers array against the objects in the guesses array.  If the value of the guess object matches the value of the corresponding answer object, the validation property on the guess object is set to true.  If the value of the guess object does not match the value of the corresponding answer object, the validation property on the guess object is set to false.
    2. The second for loop checks the validation property on each guess object in the guesses array.  If an object has a validation value of false, it returns false and stops the loop.  If the loop completes, the function returns true.
*/
function validate(answers, guesses) {
  for (let i = 0; i < guesses.length; i++) {
    if (answers[i].value === guesses[i].value) {
      guesses[i].validation = true;
    } else guesses[i].validation = false;
  }
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i].validation === false) {
      return false;
    }
  }
  return true;
}
/*
  Function takes in a boolean and resolves the game state based on the boolean:
    True: Success state for a correct answer and the correctGuesses property is increased by one on the game object.  The correctGuesses property is used to generate the score.  After 2 seconds, the reset function is called, a new problem is generated by calling the generateProblem function.

    False: Fail state for a wrong answer and the game state is changed to 'end'.  
*/
function resolver(bool) {
    answerText.innerText = game.answers[game.answers.length - 1].value;
  if (bool) {
    answerBtn.innerText = 'Correct!';
    answerBtn.className = 'button is-success';
    answerContainer.className = 'card has-background-success has-text-dark';
    game.correctGuesses += 1;
    streak.innerText = `${game.correctGuesses}`;
    setTimeout(() => {
      reset();
      const answer = generateProblem(game.operation);
      game.answers.push(answer);
    }, 2000);
  } else {
    answerBtn.innerText = 'Wrong!';
    answerBtn.className = 'button is-danger';
    answerContainer.className = 'card has-background-danger has-text-dark';
    game.state = 'end';
    streak.innerText = 'Game Over!'
    startBtn.innerText = 'New Game'
  }
}
/*
  Function resets HTML elements in preparation for a new problem
*/
function reset() {
  startBtn.innerText = 'Start'
  answerBtn.innerText = 'Check';
  answerBtn.className = 'button is-warning';
  answerContainer.className = 'card has-background-grey-darker';
  answerText.innerText = '';
  uncheckedGuess.innerText = '';
  uncheckedGuess.value = '';
  streak.innerText = game.correctGuesses
}
/* 
  Function resets HTML elements, starts a new game, and generates the first problem.
*/
function startGame() {
  game.state = 'running';
  game.operation = 'multiplication'
  game.questions = 0
  game.correctGuesses = 0
  game.answers = []
  game.guesses = []
  startBtn.innerText = 'Start'
  answerBtn.innerText = 'Check';
  answerBtn.className = 'button is-warning';
  answerContainer.className = 'card has-background-grey-darker';
  answerText.innerText = '';
  uncheckedGuess.innerText = '';
  uncheckedGuess.value = '';
  streak.innerText = game.correctGuesses
  const answer = generateProblem('multiplication');
  game.answers.push(answer);
}