"use stirct";

import { burger } from "./burger.js";

document.addEventListener("DOMContentLoaded", function () {
  burger();
});
// slider

let splide = new Splide(".splide", {
  type: "loop",
  perPage: 1,
  autoplay: true,
});

splide.mount();




