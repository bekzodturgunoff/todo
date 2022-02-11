import { homePage } from "../src/home.js";
import { todayPage } from "../src/today.js";
import { importantPage } from "../src/important.js";

const root = document.getElementById("root");
const links = document.querySelectorAll(".links");

let routes = {
  "/":homePage,
  "/overview": homePage,
  "/today": todayPage,
  "/important": importantPage,
};

links.forEach((link) => link.addEventListener("click", changeRoute));

function changeRoute(e) {
  e.preventDefault();
  root.innerHTML = "";
  const path = e.target.pathname;
  const render = routes[path];
  if (render) render(root);
  return false;
}

///////////////////////////////////////////
const buttonOne = document.querySelector("#btn1");
const buttonTwo = document.querySelector("#btn2");
const overlay = document.querySelector("#overlay");
const addTodo = document.querySelector(".add-todo");
const makeBlur = document.querySelector("#make-blur");

const form = document.querySelector("#form");
const list = document.querySelector("#list");
const input = document.querySelector("#input-t");

const highP = (document.querySelector(".high-b").checked = "false");
const mediumP = (document.querySelector(".medium-b").checked = "false");
const lowP = (document.querySelector(".low-b").checked = "false");

buttonOne.addEventListener("click", () => {
  overlay.classList.add("open");
});

buttonTwo.addEventListener("click", () => {
  overlay.classList.add("open");
});
addTodo.addEventListener("click", () => {
  overlay.classList.remove("open");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = document.createElement("div");
  // const date = document.querySelector(".overlay-date")
  item.innerText = input.value;
  // date.innerText = input.value
  item.classList.add("list-item");
  // date.classList.add("list-item")
  list.appendChild(item);
  // list.appendChild(date)
  input.value = "";

  item.addEventListener("click", () => {
    item.remove();
  });
});

homePage();
