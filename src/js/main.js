// HAM BTN and HEADER

const hamBtn = document.querySelector(".ham-btn");
const hamBtnDesktop = document.querySelector(".ham-btn--desktop");

const primaryNav = document.querySelector(".nav");
const navDesktop = document.querySelector(".nav--desktop");
const headerDesktop = document.querySelector(".header--desktop");

hamBtn.addEventListener("click", (e) => {
  if (primaryNav) {
    if (primaryNav.getAttribute("aria-expanded") === "false") {
      primaryNav.setAttribute("aria-expanded", "true");
      hamBtn.setAttribute("data-active", "true");
    } else {
      primaryNav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
    }
  }
});
hamBtnDesktop.addEventListener("click", (e) => {
  if (navDesktop) {
    if (navDesktop.getAttribute("aria-expanded") === "false") {
      navDesktop.setAttribute("aria-expanded", "true");
      hamBtnDesktop.setAttribute("data-active", "true");
    } else {
      navDesktop.setAttribute("aria-expanded", "false");
      hamBtnDesktop.setAttribute("data-active", "false");
    }
  }
});

// HEADER HIDE ON SCROLL

let lastScrollTop = 0;
let navbar = document.querySelector(".header");
let navMobile = document.querySelector(".header--mobile");
let navbarHeight = document.querySelector(".header").scrollHeight;
window.addEventListener("scroll", (e) => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = `-${navbarHeight}px`;
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;

  if (document.querySelector(".nav").getAttribute("aria-expanded") === "true") {
    navMobile.style = `
    top: 0;
    `;
  }
});

//// BACK TO TOP

const backToTopbtn = document.querySelector(".back-to-top-btn");
const wupBtn = document.querySelector(".whatsapp-btn");

backToTopbtn.addEventListener("click", (e) => {
  window.scroll({
    top: 0,
  });
});
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 150) {
    wupBtn.classList.add("active");
    backToTopbtn.setAttribute("data-visible", "true");
    navMobile.classList.add("active");
    headerDesktop.classList.add("active");
  } else {
    wupBtn.classList.remove("active");
    navMobile.classList.remove("active");
    headerDesktop.classList.remove("active");
    backToTopbtn.setAttribute("data-visible", "false");
  }
});

// HERO SLIDER

const galleries = document.querySelectorAll(".gallery");
const intervalTime = 3000;
let slideIntervals = [];

const nextSlide = (gallery) => {
  const current = gallery.querySelector(".current");
  if (current) {
    current.classList.remove("current");
    const next = current.nextElementSibling;
    if (next && next.classList.contains("slide-img")) {
      next.classList.add("current");
    } else {
      gallery.querySelector(".slide-img").classList.add("current");
    }
  } else {
    console.warn("No .current found. Initializing the first slide.");
    gallery.querySelector(".slide-img").classList.add("current");
  }
};

const prevSlide = (gallery) => {
  const current = gallery.querySelector(".current");
  if (current) {
    current.classList.remove("current");
    const prev = current.previousElementSibling;
    if (prev && prev.classList.contains("slide-img")) {
      prev.classList.add("current");
    } else {
      gallery
        .querySelectorAll(".slide-img")
        [gallery.querySelectorAll(".slide-img").length - 1].classList.add(
          "current"
        );
    }
  } else {
    console.warn("No .current found. Initializing the last slide.");
    gallery
      .querySelectorAll(".slide-img")
      [gallery.querySelectorAll(".slide-img").length - 1].classList.add(
        "current"
      );
  }
};

galleries.forEach((gallery, index) => {
  console.log(`Initializing gallery ${index + 1}`);

  const initialSlide = gallery.querySelector(".slide-img.current");
  if (!initialSlide) {
    console.warn(
      `No .current found in gallery ${index + 1}. Assigning default.`
    );
    gallery.querySelector(".slide-img").classList.add("current");
  }

  const interval = setInterval(() => nextSlide(gallery), intervalTime);
  slideIntervals.push(interval);
});

// STATS COUNT

let valueDisplays = document.querySelectorAll(".count");
let interval = 5000;

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let valueDisplay = entry.target;
        let startValue = 0;
        let endValue = Number(valueDisplay.getAttribute("data-num"));
        let duration = Math.floor(interval / endValue);

        let counter = setInterval(() => {
          startValue += 1;
          valueDisplay.textContent = startValue;
          if (startValue == endValue) {
            clearInterval(counter);
          }
        }, duration);

        // Unobserve the element after animation to prevent repeat
        observer.unobserve(valueDisplay);
      }
    });
  },
  { threshold: 0.1 }
); // Trigger when 10% of the element is visible

valueDisplays.forEach((valueDisplay) => {
  observer.observe(valueDisplay);
});

// SPLASH SCREEN

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.querySelector(".splash-screen__overlay");

  setTimeout(() => {
    splashScreen.classList.add("hidden-overlay");
  }, 1000); // 4000 milliseconds = 4 seconds
});
