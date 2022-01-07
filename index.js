//1 when I click add button
// it shoud show another window 
// to add my todo.
// 2 when I click it it should underline
// itself

const buttonOne = document.querySelector("#btn1")
const buttonTwo = document.querySelector("#btn2")
const overlay = document.querySelector("#overlay")
const addTodo = document.querySelector(".add-todo")

const form = document.querySelector("#form")
const list = document.querySelector("#list")
const input = document.querySelector("#input-t")

buttonOne.addEventListener('click', () => {
  overlay.classList.add("open")

})
buttonTwo.addEventListener('click', () => {
  overlay.classList.add("open")

})
addTodo.addEventListener("click", () => {
  overlay.classList.remove("open")

})

const container = document.querySelector(".cont")

const rightSide = container.children[1]

const listItem = rightSide.children[2]

form.addEventListener("submit", e => {
  e.preventDefault()

  const item = document.createElement("div")
  item.innerText = input.value
  item.classList.add("list-item")
  list.appendChild(item)

  input.value = ""
  list.addEventListener("click", () => {
    listItem.removeChild(item)
  })
})










