// Selectors
const timeDisplay = document.getElementById("time-display");
var startButton = document.getElementById("start");
const siteTitle = document.getElementById("title");
var questionText = document.getElementById("questions");
var answerBox = document.getElementById("question-ans-container");
const highScores = document.getElementById("high-scores");
let questionCount = 0;
const questionButton = document.getElementById("question-choice");

// Variable to store player points
let score = 0;

// List of quiz questions and answers stored at 5th position

const quizQuestions = [
  ["What's my name?", "Dave", "Kevin", "James", "Meg", "Dave"],
  ["What's my wife's name?", "Jeff", "Maggie", "Jess", "Evan", "Maggie"],
  ["Question 3", "a", "b", "c", "d", "a"],
  ["Question 4", "c", "b", "c", "d", "b"],
];
// initialize timer variable and insert into DOM
let count = 0;
timeDisplay.textContent = `Time: ${count}`;

// initializing choice variables and adding them to an array
let choiceA, choiceB, choiceC, choiceD;
let choiceArr = [choiceA, choiceB, choiceC, choiceD];

// Starts the quiz by starting timer, clearning page and adding first question
const startQuiz = () => {
  // reset counter and questionCount if played before
  count = 0;
  questionCount = 0;
  timer();
  questionSetUp();
  questionChange(questionCount);
};

// timer for quiz
const timer = () => {
  count = 75;
  timeDisplay.textContent = `Time: ${count}`;
  const gameTime = setInterval(function () {
    if (count === 0) {
      clearInterval(gameTime);
      endGame();
      return;
    }
    if (questionCount === quizQuestions.length) {
      clearInterval(gameTime);
      return;
    }
    count--;

    timeDisplay.textContent = `Time: ${count}`;
  }, 1000);
};

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

// takes in the question number and populates the question and choices
const questionChange = (num) => {
  if (num === quizQuestions.length) {
    endGame();
    return;
  }
  // resetting question font-size if endGame happened previously
  questionText.style = "font-size: 1.25rem;";
  questionText.textContent = quizQuestions[num][0];
  for (let i = 0; i < quizQuestions.length; i++) {
    choiceArr[i].textContent = quizQuestions[num][i + 1];
  }
};

// What to do with player answers
const playerAnswer = (event) => {
  if (
    event.target.className === "questionChoice" &&
    event.target.textContent === quizQuestions[questionCount][5]
  ) {
    score = score + 10;
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

// What happens if game ends under any condition
const endGame = () => {
  // get rid of choices
  for (let i = 0; i < quizQuestions.length; i++) {
    choiceArr[i].remove();
  }
  score = score + count;

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
  addYourScore();
};
// Create score submission form
const addYourScore = () => {
  const endGameContainer = document.createElement("div");
  const endGameBox = document.createElement("form");
  endGameBox.setAttribute("method", "get");
  const initialsInput = document.createElement("input");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("id", "initials");
  initialsInput.setAttribute("placeholder", "Enter your initials!");
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.textContent = "Submit";
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    submitScore(initialsInput.value);
  });
  endGameBox.appendChild(initialsInput);
  endGameBox.appendChild(submit);
  endGameContainer.appendChild(endGameBox);
  questionText.appendChild(endGameContainer);
};
const submitScore = (initials) => {
  score = score.toString();
  const playerObj = {
    player: initials,
    score: score,
  };

  const scores = JSON.parse(localStorage.getItem("players"));
  if (scores === null) {
    const topScores = [];
    topScores.push(playerObj);
    localStorage.setItem("players", JSON.stringify(topScores));
  } else {
    scores.push(playerObj);
    localStorage.setItem("players", JSON.stringify(scores));
  }
  resetAfterSubmit();
};

const displayScores = () => {
  const scoresList = document.createElement("ul");
  const items = JSON.parse(localStorage.getItem("players"));
  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = `${items[i].player}: ${items[i].score}`;
    scoresList.appendChild(listItem);
  }

  questionText.appendChild(scoresList);
};
// listening for clicks on document body
var clicked = document.body.addEventListener("click", (event) => {
  playerAnswer(event);
});

// Reset after score submit
const resetAfterSubmit = () => {
  questionText.style = "font-size: 1.25rem;";
  questionText.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers with penalize your time by 10 seconds. Remaining time will be added to your score at the end so work fast!";
  siteTitle.textContent = "Coding Quiz Challenge";
  startButton.textContent = "Start quiz";
};
startButton.addEventListener("click", function () {
  startQuiz();
});

highScores.addEventListener("click", displayScores);
