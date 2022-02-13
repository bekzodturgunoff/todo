import { homePage } from "../src/home.js";
import { todayPage } from "../src/today.js";
import { importantPage } from "../src/important.js";

const root = document.getElementById("root");
const links = document.querySelectorAll(".links");
const logoLink = document.querySelector(".logo");
const imgLinks = document.querySelectorAll(".img-links");
let routes = {
  "/": homePage,
  "/overview": homePage,
  "/today": todayPage,
  "/important": importantPage,
};

links.forEach((link) => link.addEventListener("click", changeRoute));
logoLink.addEventListener("click", changeRoute);
imgLinks.forEach((img) => img.addEventListener("click", changeRoute));

function changeRoute(e) {
  e.preventDefault();
  root.innerHTML = "";
  const path = e.target.pathname;
  const render = routes[path];
  if (render) render(root);
  return false;
}
export function renderForm() {
  const buttonOne = document.getElementById("btn1");
  const buttonTwo = document.getElementById("btn2");
  const overlay = document.getElementById("overlay");
  const addTodo = document.querySelector(".add-todo");
  const form = document.getElementById("form");

  const list = document.getElementById("list");
  const input = document.getElementById("input-t");
  const inputDate = document.getElementById("overlay-date");

  buttonOne.addEventListener("click", () => {
    overlay.classList.add("open");
  });

  buttonTwo.addEventListener("click", () => {
    overlay.classList.add("open");
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

  function Todo({ title, added_date }) {
    this.title = title;
    this.added_date = added_date;
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

  addTodo.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".input");
    const task = {};
    for (const input of inputs) {
      if (input.type === "text") {
        task[input.name] = input.value;
      } else if (input.type === "date") {
        task[input.name] = input.value;
      }
    }
    addTask(new Todo(task));
  });

  function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
      const listItem = createElement("div", { class: "list-item" });
      const inputImportant = createElement("div", {
        class: "important-checkbox",
      });
      const inputValue = createElement("div");
      const dateValue = createElement("div");
      const labelForImportant = createElement("label");
      labelForImportant.lable = "important-checkbox";

      listItem.addEventListener("click", () => removeTask(index));

      inputImportant.type = "checkbox";
      inputValue.textContent = todo.title;
      dateValue.textContent = todo.added_date;

      listItem.append(inputValue, dateValue, inputImportant);
      list.append(listItem);
      overlay.classList.remove("open");
    });
  }

  window.addEventListener("load", () => {
    const list = JSON.parse(window.localStorage.getItem(TODO_KEY));
    if (list) {
      list.forEach((task) => todos.push(new Todo(task)));
      render();
    }
  });
}

renderForm();
homePage();
