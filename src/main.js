let streak = 0;
let currentAnswer = 0;

function generateProblem() {
  const a = Math.floor(Math.random() * 15) + 1;
  const b = Math.floor(Math.random() * 15) + 1;
  currentAnswer = a * b;
  document.getElementById("problem").textContent = `${a} × ${b} = ?`;
  document.getElementById("answer-input").value = "";
  document.getElementById("result-container").className =
    "result-container hidden";
  document.getElementById("result-emoji").textContent = "🤔";
  document.getElementById("result-text").textContent = "Submit your answer!";
  document.getElementById("correct-answer").textContent = "";
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer-input").value);
  const resultContainer = document.getElementById("result-container");

  if (isNaN(userAnswer)) return;

  if (userAnswer === currentAnswer) {
    streak++;
    resultContainer.className = "result-container correct";
    document.getElementById("result-emoji").textContent = "🎉";
    document.getElementById("result-text").textContent = "Correct! Great job!";
    document.getElementById("correct-answer").textContent = "";
  } else {
    resultContainer.className = "result-container incorrect";
    document.getElementById("result-emoji").textContent = "😢";
    document.getElementById("result-text").textContent =
      "Oops! Not quite right.";
    document.getElementById(
      "correct-answer"
    ).textContent = `The answer was ${currentAnswer}`;
    streak = 0;
  }

  document.getElementById("streak").textContent = streak;
  setTimeout(generateProblem, 1500);
}

document.getElementById("submit-btn").addEventListener("click", checkAnswer);
document.getElementById("answer-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});

generateProblem();
