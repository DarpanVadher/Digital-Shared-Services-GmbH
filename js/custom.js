AOS.init({
  // disable: function () {
  // return window.innerWidth < 767;
  // },
  easing: "ease-in-out",
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

  if (hero && heroContent) {
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
  }
});

// ************************************************************************
// START : intro__link scroll
// ************************************************************************

document.querySelectorAll(".intro__link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);
    const headerEl = document.querySelector(".header");
    const headerHeight = headerEl.offsetHeight;

    const elementPosition =
      targetEl.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// ************************************************************************
// START : Header Subnav
// ************************************************************************

document.addEventListener("DOMContentLoaded", function () {
  const headerButtons = document.querySelectorAll(".header-btn");
  const innerButtons = document.querySelectorAll(".header-inner-btn");

  // Toggle first-level dropdowns
  headerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (window.innerWidth > 768) return;

      const subnavWrapper = btn.nextElementSibling;
      const svg = btn.querySelector("svg");

      // Close other dropdowns and reset their icons
      document.querySelectorAll(".header-subnav-wrapper").forEach((wrapper) => {
        if (wrapper !== subnavWrapper) {
          wrapper.style.display = "none";
          const otherBtn = wrapper.previousElementSibling;
          if (otherBtn?.tagName.toLowerCase() === "button") {
            const otherSvg = otherBtn.querySelector("svg");
            if (otherSvg) otherSvg.style.transform = "rotate(0deg)";
          }

          // Also close child dropdowns
          wrapper
            .querySelectorAll(".header-subnav-inner-wrapper")
            .forEach((inner) => {
              inner.style.display = "none";
              const innerBtn = inner.previousElementSibling;
              if (innerBtn?.tagName.toLowerCase() === "button") {
                const innerSvg = innerBtn.querySelector("svg");
                if (innerSvg) innerSvg.style.transform = "rotate(0deg)";
              }
            });
        }
      });

      const isOpen = subnavWrapper.style.display === "block";
      subnavWrapper.style.display = isOpen ? "none" : "block";
      if (svg) svg.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });

  // Toggle second-level dropdowns
  innerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (window.innerWidth > 768) return;

      const innerWrapper = btn.nextElementSibling;
      const svg = btn.querySelector("svg");

      // Close all other inner subnavs
      document
        .querySelectorAll(".header-subnav-inner-wrapper")
        .forEach((wrapper) => {
          if (wrapper !== innerWrapper) {
            wrapper.style.display = "none";
            const otherBtn = wrapper.previousElementSibling;
            if (otherBtn?.tagName.toLowerCase() === "button") {
              const otherSvg = otherBtn.querySelector("svg");
              if (otherSvg) otherSvg.style.transform = "rotate(0deg)";
            }
          }
        });

      const isOpen = innerWrapper.style.display === "block";
      innerWrapper.style.display = isOpen ? "none" : "block";
      if (svg) svg.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });

  // Reset all styles on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document
        .querySelectorAll(
          ".header-subnav-wrapper, .header-subnav-inner-wrapper"
        )
        .forEach((wrapper) => {
          wrapper.style.display = "";
        });
      document
        .querySelectorAll(".header-btn svg, .header-inner-btn svg")
        .forEach((svg) => {
          svg.style.transform = "rotate(0deg)";
        });
    }
  });
});
