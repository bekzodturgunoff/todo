//1 when I click add button
// it shoud show another window 
// to add my todo.
// 2 when I click it it should underline
// itself

const buttonOne = document.querySelector("#btn1")
const overlay = document.querySelector("#overlay")
const closeOverlay = document.querySelector("#close-overlay")
const model = document.querySelector("#model")

buttonOne.addEventListener('click', () => {
  overlay.classList.add("open")
  model.classList.add("open")
})

closeOverlay.addEventListener("click", () => {
  overlay.classList.remove("open")
  model.classList.remove("open")
})

