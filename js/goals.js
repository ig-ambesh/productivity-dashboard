const goalInput = document.getElementById("goal-input");
const addGoalBtn = document.getElementById("btn-add-goal");
const goalsList = document.getElementById("goals-list");
const goalsEmpty = document.getElementById("goals-empty");
const dashboardGoalsFill = document.getElementById("stat-goals-fill");

const dashboardGoalsText = document.getElementById("stat-goals-text");

let goals = [];

function renderGoals() {
  goalsList.innerHTML = "";

  if (goals.length === 0) {
    goalsEmpty.style.display = "flex";
    return;
  }

  goalsEmpty.style.display = "none";

  goals.forEach((goal, index) => {
    const goalItem = document.createElement("div");

    goalItem.className = goal.completed ? "goal-item completed" : "goal-item";

    goalItem.innerHTML = `
            <label class="goal-checkbox">
                <input
                    type="checkbox"
                    ${goal.completed ? "checked" : ""}
                    onchange="toggleGoal(${index})"
                >
                <span class="checkmark">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <span class="goal-text">${goal.text}</span>

            <button
               class="goal-delete-btn"
               onclick="deleteGoal(${index})"
               aria-label="Delete Goal"
            >
               <i class="fa-solid fa-trash"></i>
            </button>
        `;

    goalsList.appendChild(goalItem);
  });

  updateProgress();
}

function addGoal() {
  const text = goalInput.value.trim();

  if (text === "") {
    return;
  }

  goals.push({
    text: text,
    completed: false,
  });

  goalInput.value = "";

  renderGoals();
  saveGoals();
}

function toggleGoal(index) {
  goals[index].completed = !goals[index].completed;

  renderGoals();
  saveGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);

  renderGoals();

  saveGoals();
}

function updateProgress() {
  const completed = goals.filter((goal) => goal.completed).length;
  const total = goals.length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("goals-progress-text").textContent =
    `${completed} of ${total} Goals Completed`;

  document.getElementById("goals-progress-percent").textContent = `${percent}%`;

  document.getElementById("goals-progress-fill").style.width = `${percent}%`;

  if (dashboardGoalsFill) {
    dashboardGoalsFill.style.width = `${percent}%`;
  }

  if (dashboardGoalsText) {
    dashboardGoalsText.textContent = `${completed} of ${total}`;
  }
}

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
  goals = JSON.parse(localStorage.getItem("goals")) || [];

  renderGoals();
}

addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addGoal();
  }
});

loadGoals();
