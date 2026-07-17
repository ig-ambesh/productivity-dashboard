// ============================================
// Todo Module
// Phase 1 - Add Task
// ============================================

// Elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("btn-add-todo");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("todo-empty");
const dashboardTodoList = document.getElementById("widget-todo-list");
const totalTasksElement = document.querySelector("#stat-total-tasks .stat-value");
const completedTasksElement = document.querySelector("#stat-completed-tasks .stat-value");

// Temporary array
let tasks = [];

// Add button click
addTodoBtn.addEventListener("click", addTask);

// Press Enter
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add Task
function addTask() {
  const text = todoInput.value.trim();

  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    important: false,
  };

  tasks.push(task);
  
  saveTasks();
  renderTasks();

  todoInput.value = "";

  todoInput.focus();
}

// Render Tasks
function renderTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  tasks.forEach((task) => {
    const item = document.createElement("div");

    item.className = `todo-item ${task.important ? "important" : ""}`;

    item.innerHTML = `
        <label class="todo-checkbox">
            <input
               type="checkbox"
               class="task-checkbox"
               data-id="${task.id}"
               ${task.completed ? "checked" : ""}
            >
            <span class="todo-text ${task.completed ? "completed" : ""}">
               ${task.text}
            </span>
        </label>

            <div class="todo-actions">

                <button
                   class="btn-icon btn-important"
                   data-id="${task.id}"
                >
                   <i class="fa-${task.important ? "solid" : "regular"} fa-star"></i>
                </button>

                <button
                   class="btn-icon btn-delete"
                   data-id="${task.id}"
                >
                   <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

    todoList.appendChild(item);
  });

  attachDeleteEvents();
  attachCompleteEvents();
  attachImportantEvents();

  renderDashboardTasks();
  updateStats();
}

function renderDashboardTasks() {

    dashboardTodoList.innerHTML = "";

    if (tasks.length === 0) {

        dashboardTodoList.innerHTML = `
            <li class="widget-todo-item">
                <span class="widget-todo-text">No tasks yet</span>
            </li>
        `;

        return;
    }

    // Show only first 3 tasks
    const previewTasks = tasks.slice(-3).reverse();

    previewTasks.forEach(task => {

        let dotClass = "dot-pending";

        if (task.completed) {
            dotClass = "dot-completed";
        } else if (task.important) {
            dotClass = "dot-important";
        }

        dashboardTodoList.innerHTML += `
            <li class="widget-todo-item ${task.completed ? "completed" : ""} ${task.important ? "important" : ""}">

                <span class="widget-todo-dot ${dotClass}"></span>

                <span class="widget-todo-text">
                    ${task.text}
                </span>

                ${
                    task.important
                    ? `<span class="widget-todo-badge">
                        <i class="fa-solid fa-star"></i>
                       </span>`
                    : ""
                }

            </li>
        `;

    });

}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;

}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      tasks = tasks.filter((task) => task.id !== id);
      
      saveTasks();
      renderTasks();
    });
  });
}

function attachCompleteEvents() {
  const checkboxes = document.querySelectorAll(".task-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.dataset.id);

      const task = tasks.find((task) => task.id === id);

      if (task) {
        task.completed = checkbox.checked;
      }
      
      saveTasks();
      renderTasks();
    });
  });
}

function attachImportantEvents() {

    const buttons = document.querySelectorAll(".btn-important");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const task = tasks.find(task => task.id === id);

            if (task) {
                task.important = !task.important;
            }
            
            saveTasks();
            renderTasks();

        });

    });

}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

loadTasks();