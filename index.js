//1 when I click add button
// it shoud show another window 
// to add my todo.
// 2 when I click it it should underline
// itself

const buttonOne = document.querySelector("#btn1")
const overlay = document.querySelector("#overlay")
const addTodo = document.querySelector("#add-todo")
const listTodo = document.querySelector("#list-todo")
const input = document.querySelector(".input-t")

buttonOne.addEventListener('click', () => {
  overlay.classList.add("open")

})
addTodo.addEventListener("click", () => {
  overlay.classList.remove("open")

})

addTodo.addEventListener("submit", () => {
  e.preventDefualt()
})

const item = document.createElement("div")
item.innerText = input.value
item.classList.add("list-item")


listTodo.appendChild(item)
