"use strict";

// import { burger } from "./scripts.js";

// burger();

// const divAccordion = document.querySelectorAll(".container");

// for (let item of divAccordion) {
//   item.addEventListener("click", function (e) {
//     this.classList.toggle("active");
//   });
// }

export function setupAccordion() {
  const divAccordion = document.querySelectorAll(".container");

  for (let item of divAccordion) {
    item.addEventListener("click", function (e) {
      this.classList.toggle("active");
    });
  }
}
