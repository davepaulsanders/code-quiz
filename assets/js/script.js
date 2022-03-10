// Selectors
const timeDisplay = document.getElementById("time-display");
var startButton = document.getElementById("start");
const siteTitle = document.getElementById("title");
var questionText = document.getElementById("questions");
var answerBox = document.getElementById("question-ans-container");
const highScores = document.getElementById("high-scores");
const highScoresTitle = document.createElement("h2");
let questionCount = 0;
const questionButton = document.getElementById("question-choice");

// Variable to store player points
let score = 0;

// List of quiz questions and answers stored at 5th position

const quizQuestions = [
  [
    "Which of the following is true about variable naming conventions in JavaScript?",
    "JavaScript variable names must begin with a letter or the underscore character",
    "JavaScript variable names are case sensitive",
    "Both of the above",
    "None of the above",
    "Both of the above",
  ],
  [
    "Which built-in method returns the character at the specified index?",
    "characterAt()",
    "getCharAt()",
    "charAt()",
    "None of the above",
    "charAt()",
  ],
  [
    "Which built-in method returns the calling string value converted to upper case?",
    "toUpperCase()",
    "toUpper()",
    "changeCase(case)",
    "None of the above",
    "toUpperCase()",
  ],
  [
    "Which of the following function of String object returns the index within the calling String object of the last occurrence of the specified value?",
    "lastIndexOf()",
    "search()",
    "substr()",
    "indexOf()",
    "lastIndexOf()",
  ],
  [
    "Which of the following function of Array object returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found?",
    "indexOf()",
    "join()",
    "lastIndexOf()",
    "map()",
    "indexOf()",
  ],
  [
    "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?",
    "reverse()",
    "shift()",
    "slice()",
    "some()",
    "some()",
  ],
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
  score = 0;
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
    if (highScoresTitle.textContent.length > 0) {
      clearInterval(gameTime);
      return;
    }
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
  for (let i = 0; i < 4; i++) {
    choiceArr[i].textContent = quizQuestions[num][i + 1];
  }
};

// What to do with player answers
const playerAnswer = (event) => {
  // if correct
  if (
    event.target.className === "questionChoice" &&
    event.target.textContent === quizQuestions[questionCount][5]
  ) {
    score = score + 10;
    questionCount++;
    questionChange(questionCount);
    // if wrong
  } else if (
    event.target.className === "questionChoice" &&
    event.target.textContent !== quizQuestions[questionCount][5]
  ) {
    if (count < 10) {
      endGame();
    } else {
      event.target.textContent = "Wrong!";
      count = count - 10;
    }
  }
};

// What happens if game ends under any condition
const endGame = () => {
  console.log("fuck");
  // get rid of choices
  for (let i = 0; i < 4; i++) {
    choiceArr[i].remove();
  }
  score = score + count;

  if (count > 0 && questionCount === quizQuestions.length) {
    questionText.style = "font-size: 2rem;";
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
  const showScore = document.createElement("p");
  showScore.textContent = `Score: ${score}`;
  questionText.appendChild(showScore);
  const endGameContainer = document.createElement("div");
  const endGameBox = document.createElement("form");
  endGameBox.setAttribute("method", "get");
  const initialsInput = document.createElement("input");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("id", "initials");
  initialsInput.setAttribute("placeholder", "Enter your initials!");
  initialsInput.className = "initials-input";
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.className = "submit";
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

// adding score to local storage
const submitScore = (initials) => {
  if (
    initials.length > 3 ||
    initials.length === 0 ||
    isNaN(initials) === false
  ) {
    alert("Please input 1-3 letters only!");
    return;
  }
  initials = initials.toUpperCase();
  score = score.toString();
  const playerObj = {
    player: initials,
    score: score,
  };

  const scores = JSON.parse(localStorage.getItem("players"));
  // if local storage is empty
  if (scores === null) {
    const topScores = [];
    topScores.push(playerObj);
    localStorage.setItem("players", JSON.stringify(topScores));
    // if there are previous scores in local storage
  } else {
    scores.push(playerObj);
    localStorage.setItem("players", JSON.stringify(scores));
  }
  resetAfterSubmit();
};
//show scores after clicking on view high scores
const displayScores = () => {
  questionText.textContent = "";
  if (siteTitle) {
    siteTitle.textContent = "";
  }
  //if the buttons are visible
  if (choiceArr[0]) {
    for (let i = 0; i < 4; i++) {
      choiceArr[i].remove();
    }
    startButton.textContent = "Try again?";
    startButton.style = "display: block;";
  }

  highScoresTitle.textContent = "High Scores";
  highScoresTitle.className = "high-scores-title";
  const scoresList = document.createElement("ul");
  scoresList.className = "scores-list";
  const items = JSON.parse(localStorage.getItem("players"));
  // highest scores at top
  items.sort((a, b) => {
    return b.score - a.score;
  });
  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "list-item";
    listItem.textContent = `${items[i].player}: ${items[i].score}`;
    scoresList.appendChild(listItem);
  }
  questionText.append(highScoresTitle);
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
  // If we are on the high scores screen, the start button reloads the window so we can see the directions again
  if (highScoresTitle.textContent.length > 0) {
    location.reload();
  } else {
    startQuiz();
  }
});

highScores.addEventListener("click", displayScores);
