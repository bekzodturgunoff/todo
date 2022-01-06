//1 when I click add button
// it shoud show another window 
// to add my todo.
// 2 when I click it it should underline
// itself

const buttonOne = document.querySelector("#btn1")
const buttonTwo = document.querySelector("#btn2")
const overlay = document.querySelector("#overlay")
const addTodo = document.querySelector(".add-todo")

buttonOne.addEventListener('click', () => {
  overlay.classList.add("open")

})
buttonTwo.addEventListener('click', () => {
  overlay.classList.add("open")

})
addTodo.addEventListener("click", () => {
  overlay.classList.remove("open")

})





