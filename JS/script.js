const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");
const clearFilterBtn = document.getElementById("clear-filter-btn");
const filterDate = document.getElementById("filter-date");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task && date) {
    todos.push({ task, date });
    renderTodos(todos);
    form.reset();
  }
});

function renderTodos(data) {
  todoList.innerHTML = "";
  if (data.length === 0) {
    todoList.innerHTML = "<p class='empty'>No tasks found</p>";
    return;
  }

  data.forEach((todo, index) => {
    const item = document.createElement("div");
    item.className = "todo-item";

    const content = document.createElement("div");
    content.className = "todo-content";

    const task = document.createElement("div");
    task.className = "todo-task";
    task.textContent = todo.task;

    const date = document.createElement("div");
    date.className = "todo-date";
    date.textContent = todo.date;

    content.appendChild(task);
    content.appendChild(date);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTodo(index);

    item.appendChild(content);
    item.appendChild(delBtn);
    todoList.appendChild(item);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

filterBtn.addEventListener("click", () => {
  const selectedDate = filterDate.value;
  if (selectedDate) {
    const filtered = todos.filter((t) => t.date === selectedDate);
    renderTodos(filtered);
  }
});

clearFilterBtn.addEventListener("click", () => {
  filterDate.value = "";
  renderTodos(todos);
});
