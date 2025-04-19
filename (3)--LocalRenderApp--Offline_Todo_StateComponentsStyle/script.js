
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
  





  // all tasks render; compontents
  function renderApp() {
    // Themes
    document.body.classList.toggle("dark", state.theme === "dark");
  
    

    
    // filtration
    const filtered = state.tasks.filter((t) => {
      if (state.filter === "completed") return t.completed;
      if (state.filter === "pending") return !t.completed;
      return true;
    });
  



    // old list removeing
    taskList.innerHTML = "";





  
    // taskwise render
    filtered.forEach(renderTask);
  }
  




  // one task; components
  function renderTask(task) {
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
      saveStateToStorage();
      renderApp();
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      state.tasks = state.tasks.filter((t) => t.id !== task.id);
      saveStateToStorage();
      renderApp();
    };
  
    btns.appendChild(completeBtn);
    btns.appendChild(deleteBtn);
  
    li.appendChild(span);
    li.appendChild(cat);
    li.appendChild(btns);
    taskList.appendChild(li);
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