let state = {
  theme: "light",
  filter: "all",
  tasks: [],
};




const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");
const form = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskDateInput = document.getElementById("task-date");
const taskCategory = document.getElementById("task-category");
const filterButtons = document.querySelectorAll(".filters button");

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  renderApp();
});




themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "light" ? "dark" : "light";
  saveStateToStorage();
  renderApp();
});





form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const date = taskDateInput.value;
  const category = taskCategory.value;

  if (!name) return;

  state.tasks.push({
    id: Date.now(),
    name,
    date,
    category,
    completed: false,
    createdAt: new Date().toLocaleString(),
    editedAt: null,
  });


  form.reset();
  saveStateToStorage();
  renderApp();
});





filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    renderApp();
  })
);




function renderApp() {
  document.body.classList.toggle("dark", state.theme === "dark");

  const filtered = state.tasks.filter((t) => {
    if (state.filter === "completed") return t.completed;
    if (state.filter === "pending") return !t.completed;
    return true;
  });


  taskList.innerHTML = "";
  filtered.forEach(renderTask);
}




function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (task.completed) li.classList.add("completed");



  const textSection = document.createElement("div");
  textSection.style.flex = 1;



  const nameLine = document.createElement("div");
  nameLine.className = "task-text";
  nameLine.textContent = task.name + (task.date ? ` (Due: ${task.date})` : "");



  const meta = document.createElement("div");
  meta.style.fontSize = "12px";
  meta.style.color = "#888";
  meta.innerHTML = `Created: ${task.createdAt}`;
  if (task.editedAt) {
    meta.innerHTML += `<br>Last Edited: ${task.editedAt}`;
  }




  const category = document.createElement("span");
  category.className = "task-category";
  category.textContent = `[${task.category}]`;


  textSection.appendChild(nameLine);
  textSection.appendChild(category);
  textSection.appendChild(meta);


  const btns = document.createElement("div");
  btns.className = "task-buttons";


  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";

  completeBtn.onclick = () => {
    task.completed = !task.completed;
    saveStateToStorage();
    renderApp();
  };




  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "complete-btn";
  editBtn.onclick = () => editTask(task);


  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";


  deleteBtn.onclick = () => {
    state.tasks = state.tasks.filter((t) => t.id !== task.id);
    saveStateToStorage();
    renderApp();
  };



  btns.appendChild(completeBtn);
  btns.appendChild(editBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(textSection);
  li.appendChild(btns);
  taskList.appendChild(li);
}

function editTask(task) {
  const newName = prompt("Edit task name:", task.name);
  if (newName === null) return; // cancelled
  const newDate = prompt("Edit due date:", task.date || "");
  const newCategory = prompt("Edit category (Work, Personal, Urgent):", task.category);

  task.name = newName.trim() || task.name;
  task.date = newDate || task.date;
  task.category = newCategory || task.category;
  task.editedAt = new Date().toLocaleString();


  saveStateToStorage();
  renderApp();
}



function loadStateFromStorage() {
  const saved = JSON.parse(localStorage.getItem("state") || "{}");
  state = {
    theme: saved.theme || "light",
    filter: saved.filter || "all",
    tasks: saved.tasks || [],
  };
}



function saveStateToStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}