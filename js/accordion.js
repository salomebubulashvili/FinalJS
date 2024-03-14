"use strict"



const divAccordion = document.querySelectorAll(".container");

for (let item of divAccordion) {
    item.addEventListener("click", function (e) {
      this.classList.toggle("active");
    });
    
  }
  