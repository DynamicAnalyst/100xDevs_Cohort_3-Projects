const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskNameInput = document.getElementById("task-name");
const taskDateInput = document.getElementById("task-date");
const taskCategory = document.getElementById("task-category");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("theme-toggle");

let currentFilter = "all";




// theme loading andf tasks...
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  loadTasks();
});



// thmese change
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});



// submit stuffs...

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const date = taskDateInput.value;
  const category = taskCategory.value;
  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    date,
    category,
    completed: false,
  };

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  form.reset();
  loadTasks();
});





// buttons for filtering...
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    loadTasks();
  });
});

// taks loads an renders...
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";

  const filtered = tasks.filter((t) => {
    if (currentFilter === "completed") return t.completed;
    if (currentFilter === "pending") return !t.completed;
    return true;
  });

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.name + (task.date ? ` (Due: ${task.date})` : "");

    const cat = document.createElement("span");
    cat.className = "task-category";
    cat.textContent = `[${task.category}]`;

    const btns = document.createElement("div");
    btns.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      updateTask(task);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      deleteTask(task.id);
    };

    btns.appendChild(completeBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(cat);
    li.appendChild(btns);
    taskList.appendChild(li);
  });
}

function updateTask(updatedTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const newTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  loadTasks();
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const newTasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  loadTasks();
}