//1 when I click add button
// it shoud show another window 
// to add my todo.
// 2 when I click it it should underline
// itself

const buttonOne = document.querySelector("#btn1")
const buttonTwo = document.querySelector("#btn2")
const overlay = document.querySelector("#overlay")
const addTodo = document.querySelector(".add-todo")
const makeBlur = document.querySelector("#make-blur")
console.log(overlay)

const form = document.querySelector("#form")
const list = document.querySelector("#list")
const input = document.querySelector("#input-t")

const highP = document.querySelector(".high-b").checked = "false"
const mediumP = document.querySelector(".medium-b").checked = "false"
const lowP = document.querySelector(".low-b").checked = "false"



buttonOne.addEventListener('click', () => {
  overlay.classList.add("open")

})


buttonTwo.addEventListener('click', () => {
  overlay.classList.add("open")

})
addTodo.addEventListener("click", () => {
  overlay.classList.remove("open")

})

form.addEventListener("submit", e => {
  e.preventDefault()
  const item = document.createElement("div")
  // const date = document.querySelector(".overlay-date")
  item.innerText = input.value
  // date.innerText = input.value
  item.classList.add("list-item")
  // date.classList.add("list-item")
  list.appendChild(item)
  // list.appendChild(date)
  input.value = ""


  item.addEventListener("click", () => {
    item.remove()
  })
})

  // (function () {
  //   $('#submit').on('click', function () {
  //     var date = new Date($('.overlay-date').val());
  //     day = date.getDate();
  //     month = date.getMonth() + 1;
  //     year = date.getFullYear();
  //     alert([day, month, year].join('/'));
  //   });
  // })();
