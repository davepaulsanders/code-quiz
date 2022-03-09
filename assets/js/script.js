// Selectors
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start");
const siteTitle = document.getElementById("title");
var questionText = document.getElementById("questions");

const quizQuestions = [
  ["Question 1", "a", "b", "c", "d", "c"],
  ["Question 2", "a", "b", "c", "d", "d"],
  ["Question 3", "a", "b", "c", "d", "a"],
  ["Question 4", "a", "b", "c", "d", "b"],
];
let count = 0;
timeDisplay.textContent = `Time: ${count}`;

const startQuiz = () => {
  timer();
  siteTitle.textContent = "";
  questionText.textContent = quizQuestions[0][0];
};
const timer = () => {
  count = 75;
  timeDisplay.textContent = `Time: ${count}`;
  const gameTime = setInterval(function () {
    if (count === 0) {
      questionText.textContent = "You lose!";
      clearInterval(gameTime);
      return;
    }
    count--;

    timeDisplay.textContent = `Time: ${count}`;
  }, 1000);
};
startButton.addEventListener("click", function () {
  startQuiz();
});
