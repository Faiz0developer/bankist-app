"use strict";

///////////////////////////////////////

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const allSection = document.querySelectorAll(".section");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

// MODAL_WINDOW
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// CHANGING_COLOR
const h1 = document.querySelector("h1");
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";

// COOKIE
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});

message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// BUTTON_SCROLLING
btnScrollTo.addEventListener("click", (e) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

// PAGE_NAVIGATION
// event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED_COMPONENT
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab ");
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU__FADE__ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// STICKY_NAVIGATION
// i)
// const initailCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > initailCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// ii) Intersection Observer API:
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// ANIMATING_SECTIONS
const allSections = document.querySelectorAll(".section");

const animatingSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(animatingSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY_LOADING_IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");

const loading = (entries, observer) => {
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObsrever = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObsrever.observe(img));

// SLIDER
const slider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  let maxSlide = slides.length;

  // Functions ->
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const acvtivateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    gotoSlide(curSlide);
    acvtivateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    acvtivateDot(curSlide);
  };

  // initialisation->
  const init = function () {
    gotoSlide(0);
    createDots();

    acvtivateDot(0);
  };
  init();
  // Event Handlers->
  //next slide
  btnRight.addEventListener("click", nextSlide);

  // prev slide
  btnLeft.addEventListener("click", prevSlide);

  //sliding using keyboard
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  //sliding by dots
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      acvtivateDot(slide);
    }
  });
};

slider();

// MOBILE_NAV
const navImg = document.querySelector(".nav__logo");
const navLinks = document.querySelector(".nav__links");

const navHiddenClass = document.querySelector(".nav__links");
navImg.addEventListener("click", function (e) {
  if (navHiddenClass.classList.contains("nav__links--hidden")) {
    navHiddenClass.classList.remove("nav__links--hidden");
    nav.style.height = "70%";
  } else {
    navHiddenClass.classList.add("nav__links--hidden");
    nav.style.height = "20%";
  }
});

navLinks.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav__link")) {
    navHiddenClass.classList.add("nav__links--hidden");
  }
});
