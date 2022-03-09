// Selectors
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start");
let count = 0;
timeDisplay.textContent = `Time: ${count}`;

const timer = () => {
  const gameTime = setInterval(function () {
    if (count === 0) {
      clearInterval(gameTime);
      return false;
    }
    count--;
    timeDisplay.textContent = `Time: ${count}`;
    //timeDisplay.textContent = `Time: ${count}`
  }, 1000);
};
startButton.addEventListener("click", function () {
  count = 75;
  timeDisplay.textContent = `Time: ${count}`;
  timer();
});
