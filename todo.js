const tasks = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
    });
    listItem.appendChild(checkbox);

    const taskLabel = document.createElement("label");
    taskLabel.innerText = task.title;
    taskLabel.classList.add(task.priority);
    listItem.appendChild(taskLabel);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTasks();
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function addTask(title, priority) {
  const newTask = {
    id: Date.now(),
    title,
    priority,
    completed: false,
  };
  
