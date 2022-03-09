// Selectors
const timeDisplay = document.getElementById("time-display");
var startButton = document.getElementById("start");
const siteTitle = document.getElementById("title");
var questionText = document.getElementById("questions");
var answerBox = document.getElementById("question-ans-container");
let questionCount = 0;
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
  ["Question 3", "a", "b", "c", "d", "a"],
  ["Question 4", "c", "b", "c", "d", "b"],
];
let count = 0;
timeDisplay.textContent = `Time: ${count}`;

// Starts the quiz by starting timer, clearning page and adding first question
const startQuiz = () => {
  // reset counter if played before
  count = 0;
  questionCount = 0;
  timer();
  questionSetUp();
  questionChange(questionCount);
};

// takes in the question number and populates the question and choices
const questionChange = (num) => {
  if (num === quizQuestions.length) {
    endGame();
    return;
  }
  // resetting question font-size if loss happened previously
  questionText.style = "font-size: 1.25rem;";
  questionText.textContent = quizQuestions[num][0];
  for (let i = 0; i < quizQuestions.length; i++) {
    choiceArr[i].textContent = quizQuestions[num][i + 1];
  }
};

//timer for quiz
const timer = () => {
  count = 75;
  timeDisplay.textContent = `Time: ${count}`;
  const gameTime = setInterval(function () {
    if (count === 0) {
      clearInterval(gameTime);
      endGame();
      return;
    }
    count--;

    timeDisplay.textContent = `Time: ${count}`;
  }, 1000);
};
startButton.addEventListener("click", function () {
  startQuiz();
});

// What happens if game ends under any condition
const endGame = () => {
  // get rid of choices
  for (let i = 0; i < quizQuestions.length; i++) {
    choiceArr[i].remove();
  }

  if (count > 0 && questionCount === quizQuestions.length) {
    questionText.style = "font-size: 3rem;";
    questionText.textContent = "You win!";
    startButton.style = "display: block;";
    startButton.textContent = "Try again?";
    // This doesn't allow restart for some reason
  } else {
    questionText.style = "font-size: 3rem;";
    questionText.textContent = "You lose!";
    startButton.style = "display: block;";
    startButton.textContent = "Try again?";
  }
};

// What to do with player answers
const playerAnswer = (event) => {
  if (
    event.target.className === "questionChoice" &&
    event.target.textContent === quizQuestions[questionCount][5]
  ) {
    questionCount++;
    questionChange(questionCount);
  } else if (
    event.target.className === "questionChoice" &&
    event.target.textContent !== quizQuestions[questionCount][5]
  ) {
    if (count < 10) {
      endGame();
    } else {
      count = count - 10;
    }
  }
};

// listening for clicks on document body
var clicked = document.body.addEventListener("click", (event) => {
  playerAnswer(event);
});
