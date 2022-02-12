import { renderForm } from "../dist/index.js";


export function todayPage(where) {
  const overviewText = document.querySelector(".add-overview");
  overviewText.textContent = "Today";
}

// Create date from input value
var inputDate = new Date("11/21/2011");

// Get today's date
var todaysDate = new Date();

// call setHours to take the time out of the comparison
if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
  // Date equals today's date
}
console.log(todaysDate);

