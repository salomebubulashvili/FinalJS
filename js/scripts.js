"use stirct"

const navBar = document.getElementById("nav");
const burgerBar = document.getElementById("burgerBar");

burgerBar.addEventListener("click", function () {
    navBar.classList.toggle("activeNav");

    const burgerLine2 = document.querySelector(".bar2"); 
    burgerLine2.classList.toggle("burger-line-hide");

    const burgerLines = document.querySelectorAll(".bar"); 
    burgerLines.forEach(function (element) {
        element.classList.toggle("lines-to-X");
    });
});

// slider

let splide = new Splide( '.splide', {
    type    : 'loop',
    perPage : 2,
    autoplay: true,
  } );
  
  splide.mount();

  

