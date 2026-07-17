// ============================================
// Todo Module
// Phase 1 - Add Task
// ============================================

// Elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("btn-add-todo");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("todo-empty");

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
  };

  tasks.push(task);

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

    item.className = "todo-item";

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
                <button class="btn-icon btn-delete" data-id="${task.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

    todoList.appendChild(item);
  });

  attachDeleteEvents();
  attachCompleteEvents();
}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      tasks = tasks.filter((task) => task.id !== id);

      renderTasks();
    });
  });
}

function attachCompleteEvents() {

    const checkboxes = document.querySelectorAll(".task-checkbox");

    checkboxes.forEach((checkbox) => {

        checkbox.addEventListener("change", () => {

            const id = Number(checkbox.dataset.id);

            const task = tasks.find(task => task.id === id);

            if(task){
                task.completed = checkbox.checked;
            }

            renderTasks();

        });

    });

}