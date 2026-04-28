let editIndex = -1;

// LOGIN
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (user === "" || pass === "") {
    alert("Enter username & password");
    return;
  }

  localStorage.setItem("user", user);
  window.location.href = "dashboard.html";
}

// CHECK LOGIN (protect dashboard)
if (window.location.pathname.includes("dashboard.html")) {
  let user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  alert("Logged out successfully");
  window.location.href = "index.html";
}

// GET TASKS
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// SAVE TASKS
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD / UPDATE TASK
function addTask() {
  let title = document.getElementById("taskInput").value.trim();
  let date = document.getElementById("dueDate").value;
  let notes = document.getElementById("notes").value.trim();

  if (title === "") {
    alert("Enter task");
    return;
  }

  let tasks = getTasks();

  if (editIndex === -1) {
    tasks.push({ title, date, notes });
  } else {
    tasks[editIndex] = { title, date, notes };
    editIndex = -1;
  }

  saveTasks(tasks);
  loadTasks();
  clearFields();
}

// LOAD TASKS
function loadTasks() {
  let list = document.getElementById("taskList");
  if (!list) return; // prevent error on login page

  let tasks = getTasks();
  list.innerHTML = "";

  tasks.forEach((t, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="task-content">
        <strong>${t.title}</strong>
        <p>📅 ${t.date || "No date"}</p>
        <p>📝 ${t.notes || "No notes"}</p>
      </div>
      <div class="actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// DELETE
function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

// EDIT
function editTask(index) {
  let t = getTasks()[index];

  document.getElementById("taskInput").value = t.title;
  document.getElementById("dueDate").value = t.date;
  document.getElementById("notes").value = t.notes;

  editIndex = index;
}

// CLEAR INPUT
function clearFields() {
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("notes").value = "";
}

// LOAD ON DASHBOARD
window.onload = loadTasks;