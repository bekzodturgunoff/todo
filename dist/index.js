const links = document.querySelectorAll(".links");

const buttonOne = document.getElementById("btn1");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const form = document.getElementById("form");

const list = document.getElementById("list");
let titleOfTodo = document.querySelector(".add-overview");

const overviewBtn = document.querySelector(".overview");
const todayBtn = document.querySelector(".today");
const importantBtn = document.querySelector(".important");
const overlayCloseBtn = document.querySelector(".overlay-close-btn");

const projectForm = document.querySelector(".project-form");
let projectInput = document.getElementById("project-input");

overlayCloseBtn.addEventListener("click", () => {
  modal.classList.remove("open");
  overlay.classList.remove("open");
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    [...e.target.parentElement.children].forEach((sib) =>
      sib.classList.remove("active")
    );
    e.target.classList.add("active");
    console.log(links);
  });
});

buttonOne.addEventListener("click", () => {
  modal.classList.add("open");
  overlay.classList.add("open");
});

projectForm.addEventListener("click", (e) => {
  e.preventDefault();
  projectInput.classList.add("active");
  console.log(projectInput);
});

function createElement(tag, attributes) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
}

const todos = [];
const TODO_KEY = "todos";

function Todo({ section, title, added_date, priority }) {
  this.section = section;
  this.title = title;
  this.added_date = added_date;
  this.priority = priority;
}
function addTask(task) {
  todos.push(task);
  window.localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  render();
}

function removeTask(index) {
  todos.splice(index, 1);
  window.localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  render();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll(".input");
  const priorityInput = form.querySelector(".input:checked");
  const task = {};
  for (const input of inputs) {
    if (input.type === "text") {
      task[input.name] = input.value;
    } else if (input.type === "date") {
      task[input.name] = input.value;
    } else if (input.name === "checkbox") {
      task[input.name] = input.checked;
    } else {
      task[input.name] = input.value;
    }
  }
  task[priorityInput.name] = priorityInput.value;

  addTask(new Todo(task));
  form.reset();
});

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = createElement("div", { id: "list-item" });
    const inputImportant = createElement("input", {
      class: "important-checkbox",
    });

    const importantLabel = document.createElement("label");
    importantLabel.classList.add("important-label");
    const delBtn = createElement("button", { class: "todo-del-btn" });
    const inputValue = createElement("div");
    const dateValue = createElement("div");
    delBtn.addEventListener("click", () => removeTask(index));
    inputImportant.type = "checkbox";
    inputValue.textContent = todo.title;
    dateValue.textContent = todo.added_date;
    inputImportant.checked = todo.checkbox;
    delBtn.textContent = "X";
    listItem.append(importantLabel, inputValue, dateValue, delBtn);
    list.append(listItem);
    importantLabel.append(inputImportant);
    modal.classList.remove("open");
    overlay.classList.remove("open");

    inputImportant.addEventListener("change", (e) => {
      if (e.target.checked) {
        listItem.classList.add("style-list-item");
      } else {
        listItem.classList.remove("style-list-item");
      }
    });
  });
}

window.addEventListener("load", () => {
  const list = JSON.parse(window.localStorage.getItem(TODO_KEY));
  if (list) {
    list.forEach((task) => todos.push(new Todo(task)));
    render();
  }
});

projectsArray = [
  {
    id: Math.random().toString(32).slice(2),
    title: "Overview",
    todos: [
      {
        title: "Hello world!",
        added_date: "2012-22-2",
        priority: "high",
      },
    ],
  },
  {
    id: Math.random().toString(32).slice(2),
    title: "Today",
    todos: [
      {
        title: "Hello world!",
        added_date: "2012-22-2",
        priority: "high",
      },
    ],
  },
  {
    id: Math.random().toString(32).slice(2),
    title: "Important",
    todos: [
      {
        title: "Hello world!",
        added_date: "2012-22-2",
        priority: "high",
      },
    ],
  },
];

function Project({ title } = {}) {
  this.title = title;
  this.id = Math.random().toString(32).slice(2);
  this.todos = [];
}

const project = new Project({ title: "Today" });

console.log(project);
