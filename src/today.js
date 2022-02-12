import { renderForm } from "../dist/index.js";

export function todayPage(where) {
  const overviewText = document.querySelector(".add-overview");
  overviewText.textContent = "Today";
}

let inputDate = new Date("2022/02/12");
let todaysDate = new Date();
if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
}
console.log(todaysDate == inputDate.value);
