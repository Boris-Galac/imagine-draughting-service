// ham btn

const hamBtn = document.querySelector(".ham-btn");
const primaryNav = document.querySelector(".nav");

hamBtn.addEventListener("click", (e) => {
  if (primaryNav.getAttribute("aria-expanded") === "false") {
    primaryNav.setAttribute("aria-expanded", "true");
    hamBtn.setAttribute("data-active", "true");
  } else {
    primaryNav.setAttribute("aria-expanded", "false");
    hamBtn.setAttribute("data-active", "false");
  }
});
