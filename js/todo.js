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
        text: text
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

    tasks.forEach(task => {

        const item = document.createElement("div");

        item.className = "todo-item";

        item.innerHTML = `
            <span class="todo-text">${task.text}</span>

            <div class="todo-actions">
                <button class="btn-icon btn-delete" data-id="${task.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        todoList.appendChild(item);

    });

    attachDeleteEvents();
}

function attachDeleteEvents() {

    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            tasks = tasks.filter(task => task.id !== id);

            renderTasks();

        });

    });

}