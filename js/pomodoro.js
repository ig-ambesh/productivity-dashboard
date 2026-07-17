const timerDisplay = document.getElementById("pomodoro-timer");
const sessionLabel = document.getElementById("pomodoro-session-label");

const startBtn = document.getElementById("btn-pomodoro-start");
const pauseBtn = document.getElementById("btn-pomodoro-pause");
const resetBtn = document.getElementById("btn-pomodoro-reset");

const FOCUS_TIME = 5;
const BREAK_TIME = 5;

let isBreak = false;

let timeLeft = FOCUS_TIME;
let timer = null;
let isRunning = false;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) {
    return;
  }

  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;

    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);

      isRunning = false;

      switchSession();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);

  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);

  isRunning = false;

  isBreak = false;

  timeLeft = FOCUS_TIME;

  sessionLabel.textContent = "Focus Session";

  updateDisplay();
}

function switchSession() {

    if (isBreak) {

        isBreak = false;

        timeLeft = FOCUS_TIME;

        sessionLabel.textContent = "Focus Session";

    } else {

        isBreak = true;

        timeLeft = BREAK_TIME;

        sessionLabel.textContent = "Break Session";

    }

    updateDisplay();

    showNotification();

    startTimer();

}

function showNotification() {
    console.log("Notification function called");
  if (Notification.permission === "granted") {
    new Notification(isBreak ? "☕ Break Time!" : "🍅 Focus Time!", {
      body: isBreak
        ? "Take a 5 minute break."
        : "Break is over. Time to focus!",
    });
  }
}

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

updateDisplay();

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
