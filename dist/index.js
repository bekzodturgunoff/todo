import { homePage } from "../src/home.js";
import { todayPage } from "../src/today.js";
import { importantPage } from "../src/important.js";

const root = document.getElementById("root");
const links = document.querySelectorAll(".links");
const logoLink = document.querySelector(".logo");

let routes = {
  "/": homePage,
  "/overview": homePage,
  "/today": todayPage,
  "/important": importantPage,
};

links.forEach((link) => link.addEventListener("click", changeRoute));
logoLink.addEventListener("click", changeRoute);

function changeRoute(e) {
  e.preventDefault();
  root.innerHTML = "";
  const path = e.target.pathname;
  const render = routes[path];
  if (render) render(root);
  return false;
}
export function renderForm() {
  const buttonOne = document.querySelector("#btn1");
  const buttonTwo = document.querySelector("#btn2");
  const overlay = document.querySelector("#overlay");
  const addTodo = document.querySelector(".add-todo");
  const makeBlur = document.querySelector("#make-blur");

  const form = document.querySelector("#form");
  const list = document.querySelector("#list");
  const input = document.querySelector("#input-t");
  const inputDate = document.querySelector(".overlay-date");

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
    const listItem = document.createElement("div");
    const inputValue = document.createElement("div");
    const dateValue = document.createElement("div");
    listItem.classList.add("list-item");
    inputValue.textContent = input.value;
    dateValue.textContent = inputDate.value;
    inputDate.value = "";
    input.value = "";
    listItem.append(inputValue, dateValue);
    list.append(listItem);
    listItem.addEventListener("click", () => {
      listItem.remove();
    });
  });
}
renderForm();

homePage();
