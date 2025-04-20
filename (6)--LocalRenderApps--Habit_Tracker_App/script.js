document.addEventListener("DOMContentLoaded", () => {
    loadHabits();
    document.getElementById("habit-form").addEventListener("submit", addHabit);
  });




  
  let habits = [];




  
  function addHabit(e) {
    e.preventDefault();
    const input = document.getElementById("habit-name");
    const name = input.value.trim();
    if (!name) return;
  



    const newHabit = {
      id: Date.now(),
      name,
      days: Array(30).fill(false) // 30-day habit tracker
    };
  



    habits.push(newHabit);
    input.value = "";
    saveHabits();
    renderHabits();
  }




  
  function toggleDay(habitId, dayIndex) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      habit.days[dayIndex] = !habit.days[dayIndex];
      saveHabits();
      renderHabits();
    }
  }
  




  function renderHabits() {
    const grid = document.getElementById("habit-grid");
    grid.innerHTML = "";
  



    habits.forEach(habit => {
      const habitDiv = document.createElement("div");
      habitDiv.className = "habit";
  
      const title = document.createElement("div");
      title.className = "habit-title";
      title.textContent = habit.name;
      habitDiv.appendChild(title);
  
      const daysDiv = document.createElement("div");
      daysDiv.className = "habit-days";
  
      habit.days.forEach((done, index) => {
        const day = document.createElement("div");
        day.className = "day";
        if (done) day.classList.add("active");
        day.textContent = index + 1;
        day.onclick = () => toggleDay(habit.id, index);
        daysDiv.appendChild(day);
      });
  
      habitDiv.appendChild(daysDiv);
      grid.appendChild(habitDiv);
    });
  }






  
  function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
  }


  
  
  function loadHabits() {
    const stored = localStorage.getItem("habits");
    if (stored) {
      habits = JSON.parse(stored);
      renderHabits();
    }
  }