// Selectors
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start");
const siteTitle = document.getElementById("title");
var questionText = document.getElementById("questions");
var answerBox = document.getElementById("question-ans-container");
let questionNumber = 0;
const questionButton = document.getElementById("question-choice");

// initializing choice variables and adding them to an array
let choiceA, choiceB, choiceC, choiceD;
let choiceArr = [choiceA, choiceB, choiceC, choiceD];

// removes title, creates choice buttons and adds them to HTML
const questionSetUp = () => {
  siteTitle.textContent = "";
  startButton.style = "display: none";
  for (let i = 0; i < choiceArr.length; i++) {
    choiceArr[i] = document.createElement("button");
    choiceArr[i].className = "questionChoice";
    choiceArr[i].setAttribute("id", "question-choice");
    answerBox.appendChild(choiceArr[i]);
  }
};

// this accesses the right element, but it's not a function which is an issue
const quizQuestions = [
  ["What's my name?", "Dave", "Kevin", "James", "Meg", "Dave"],
  ["What's my wife's name?", "Jeff", "Maggie", "Jess", "Evan", "Maggie"],
  ["Question 3", "b", "b", "c", "d", "a"],
  ["Question 4", "c", "b", "c", "d", "b"],
];
let count = 0;
timeDisplay.textContent = `Time: ${count}`;

// Starts the quiz by starting timer, clearning page and adding first question
const startQuiz = () => {
  timer();
  questionSetUp();
  questionChange(questionNumber);
};

// takes in the question number and populates the question and choices
const questionChange = (num) => {
  questionText.textContent = quizQuestions[num][0];
  for (let i = 0; i < quizQuestions.length; i++) {
    choiceArr[i].textContent = quizQuestions[num][i + 1];
  }
};

//timer for quiz
const timer = () => {
  count = 1000;
  timeDisplay.textContent = `Time: ${count}`;
  const gameTime = setInterval(function () {
    if (count === 0) {
      questionText.textContent = "You lose!";
      startButton.textContent = "Try again?";
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

var clicked = document.body.addEventListener("click", (event) => {
  if (
    event.target.className === "questionChoice" &&
    event.target.textContent === quizQuestions[questionNumber][5]
  ) {
    questionNumber++;
    questionChange(questionNumber);
  } else if (
    event.target.className === "questionChoice" &&
    event.target.textContent !== quizQuestions[questionNumber][5]
  ) {
    if (count < 10) {
      questionText.textContent = "You lose!";
    } else {
      count = count - 10;
    }
  }
});
