AOS.init({
  // disable: function () {
  // return window.innerWidth < 767;
  // },
});

// ************************************************************************
// START : Header Scroll
// ************************************************************************

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (scroll >= 1) {
    document.querySelector(".header").classList.add("is-scroll");
    document.body.classList.add("is-scroll");
  } else {
    document.querySelector(".header").classList.remove("is-scroll");
    document.body.classList.remove("is-scroll");
  }
});

// ************************************************************************
// START : Hamburger
// ************************************************************************

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".hamburger").classList.toggle("is-active");
  document.querySelector(".header nav").classList.toggle("is-active");
  document.querySelector(".header").classList.toggle("is-active");
  document.body.classList.toggle("is-open-menu");
});

// ************************************************************************
// START : Parallax
// ************************************************************************

document.addEventListener("DOMContentLoaded", function () {
  let hero = document.querySelector(".hero");
  let heroContent = document.querySelector(".hero__content");

  // Fade-in Effect on Load
  setTimeout(() => {
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
  }, 500);

  // Parallax Scroll Effect
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;

    // Background moves at a slower pace than scroll for parallax effect
    hero.style.backgroundPosition = `center ${scrollTop * 0.3}px`;

    // Opacity & Scale Effect
    let opacity = 1 - scrollTop * 0.001;
    hero.style.opacity = opacity > 0.3 ? opacity : 0.3;
  });
});
