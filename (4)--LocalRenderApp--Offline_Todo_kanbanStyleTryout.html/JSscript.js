let tasks = [];

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, status: "todo" });
  input.value = "";
  renderTasks();
}



function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  renderTasks();
}



function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}



function renderTasks() {

  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("done").innerHTML = "";





  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";







    const title = document.createElement("h3");
    title.innerText = task.text;





    const select = document.createElement("select");
    ["todo", "inprogress", "done"].forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.text = status === "todo" ? "To Do" : status === "inprogress" ? "In Progress" : "Done";
      if (task.status === status) option.selected = true;
      select.appendChild(option);
    });





    select.onchange = (e) => updateStatus(index, e.target.value);



    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(index);






    div.appendChild(title);
    div.appendChild(select);
    div.appendChild(delBtn);




    document.getElementById(task.status).appendChild(div);
  });

  
}