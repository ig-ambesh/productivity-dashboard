const timerDisplay = document.getElementById("pomodoro-timer");
const sessionLabel = document.getElementById("pomodoro-session-label");

const startBtn = document.getElementById("btn-pomodoro-start");
const pauseBtn = document.getElementById("btn-pomodoro-pause");
const resetBtn = document.getElementById("btn-pomodoro-reset");
const completedElement = document.getElementById("pomodoro-completed");

const FOCUS_TIME = 5;
const BREAK_TIME = 5;

let isBreak = false;

let timeLeft = FOCUS_TIME;
let timer = null;
let isRunning = false;
let completedSessions = 0;

function savePomodoro() {
  localStorage.setItem(
    "pomodoro",
    JSON.stringify({
      timeLeft,
      isBreak,
      isRunning,
      completedSessions,
    }),
  );
}

function loadPomodoro() {
  const savedData = JSON.parse(localStorage.getItem("pomodoro"));

  if (!savedData) {
    return;
  }

  timeLeft = savedData.timeLeft;
  isBreak = savedData.isBreak;
  isRunning = savedData.isRunning;

  sessionLabel.textContent = isBreak ? "Break Session" : "Focus Session";

  updateDisplay();

  if (isRunning) {
    isRunning = false;
    startTimer();
  }

  completedSessions = savedData.completedSessions || 0;

  updateCompletedCounter();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  updateProgressRing();
}

function updateProgressRing() {
  const ring = document.querySelector(".pomodoro-ring");

  const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;

  const progress = ((totalTime - timeLeft) / totalTime) * 360;

  ring.style.background = `
        conic-gradient(
            var(--color-pomodoro) ${progress}deg,
            rgba(255,255,255,0.08) ${progress}deg
        )
    `;
}

function updateCompletedCounter() {
  completedElement.textContent = completedSessions;
}

function startTimer() {
  if (isRunning) {
    return;
  }

  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;

    savePomodoro();
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
  savePomodoro();
}

function resetTimer() {
  clearInterval(timer);

  isRunning = false;

  isBreak = false;

  timeLeft = FOCUS_TIME;

  sessionLabel.textContent = "Focus Session";

  savePomodoro();
  updateDisplay();
}

function switchSession() {
  if (!isBreak) {
    completedSessions++;

    updateCompletedCounter();
  }

  if (isBreak) {
    isBreak = false;

    timeLeft = FOCUS_TIME;

    sessionLabel.textContent = "Focus Session";
  } else {
    isBreak = true;

    timeLeft = BREAK_TIME;

    sessionLabel.textContent = "Break Session";
  }

  savePomodoro();
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

loadPomodoro();
updateCompletedCounter();

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
