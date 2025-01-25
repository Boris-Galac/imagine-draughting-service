// HAM BTN and HEADER

const hamBtn = document.querySelector(".ham-btn");
// const hamBtnDesktop = document.querySelector(".ham-btn--desktop");

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

///// 👉 INDEX PAGE
if (document.querySelector(".main").classList.contains("index-main")) {
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
      gallery
        .querySelectorAll(".slide-img")
        [gallery.querySelectorAll(".slide-img").length - 1].classList.add(
          "current"
        );
    }
  };

  galleries.forEach((gallery, index) => {
    const initialSlide = gallery.querySelector(".slide-img.current");
    if (!initialSlide) {
      gallery.querySelector(".slide-img").classList.add("current");
    }

    const interval = setInterval(() => nextSlide(gallery), intervalTime);
    slideIntervals.push(interval);
  });

  // PLAY THE VIDEO

  const videoBtn = document.querySelector(".play-the-video");

  videoBtn.addEventListener("click", () => {
    const videoOverlay = document.createElement("div");
    videoOverlay.classList.add("overlay-play-the-video");

    const video = document.createElement("video");
    video.src = "/src/assets/balcon-video.mp4";
    video.controls = true;
    video.autoplay = true;

    videoOverlay.appendChild(video);

    document.body.appendChild(videoOverlay);

    videoOverlay.addEventListener("click", (event) => {
      if (event.target === videoOverlay) {
        document.body.removeChild(videoOverlay);
      }
    });
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
    { threshold: 0.2 }
  ); // Trigger when 10% of the element is visible

  valueDisplays.forEach((valueDisplay) => {
    observer.observe(valueDisplay);
  });
}
///// 👉 PROJECTS PAGE
if (document.querySelector(".main").classList.contains("projects-main")) {
  // baguettebox

  baguetteBox.run(".gallery");
}
if (document.querySelector(".main").classList.contains("gallery-works-main")) {
  // baguettebox

  baguetteBox.run(".gallery");
}
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

///////// INTERSECTION OBSERVER

// from left stagger

const observere = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      //  else {
      //   entry.target.classList.remove("active");
      // }
    });
  },
  { threshold: 0.2 }
);

// left
const left = document.querySelectorAll(".hidden-left");
left.forEach((el) => observere.observe(el));
// right
const right = document.querySelectorAll(".hidden-right");
right.forEach((el) => observere.observe(el));
// bottom
const fade = document.querySelectorAll(".hidden-fade");
fade.forEach((el) => observere.observe(el));
// clippy circle
const clippyCircle = document.querySelectorAll(".circle-clip-animation");
clippyCircle.forEach((el) => observere.observe(el));

//////// SWIPER

var swiper = new Swiper(".reviews-swiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: "true",
  speed: 1000,
  autoplay: {
    delay: 2500,
  },
});

///// PADDING HEADER

if (document.body.classList.contains("subpage")) {
  document.querySelector(".main").style = `
      padding-top: 77px;
    `;
}
/////// GSAP

gsap.registerPlugin(ScrollTrigger);

gsap.from(".service-card", {
  opacity: 0,
  x: -50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".service-card",
    start: "top 90%",
    // markers: true,
  },
});
gsap.from(".dream-team-card", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".dream-team-card",
    start: "top 90%",
    // markers: true,
  },
});
gsap.from(".blog-article", {
  opacity: 0,
  x: -50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".blog-article",
    start: "top 90%",
    // markers: true,
  },
});
gsap.from(".team-card", {
  opacity: 0,
  x: -50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".team-card",
    start: "top 90%",
    // markers: true,
  },
});
gsap.from(".services__overlay::after", {
  opacity: 0,
  x: -50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".services__overlay::after",
    start: "top 90%",
    // markers: true,
  },
});

gsap.to(".services__overlay::after", {
  y: 700,
  duration: 4,
  scrollTrigger: {
    scrub: 1,
    trigger: ".services__overlay::after",
    toggleActions: "restart none none none", ///  1. onEnter 2. onLeave  3. onEnterBack  4. onLeaveBack
    start: "top 70%",
    end: "top 25%",
    // markers: true,
  },
});
