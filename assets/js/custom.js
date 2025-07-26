document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 300,
    easing: "ease-in-out",
    once: false,
    mirror: true,
    offset: 0, // Change offset to trigger animations sooner/later
  });

  // Refresh AOS when dynamic content loads
  window.addEventListener("load", function () {
    AOS.refresh();
  });
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

// ************************************************************************

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].trim().split("=");
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  return null;
}

window.addEventListener("DOMContentLoaded", () => {
  const cookieCard = document.querySelector(".cookie-card-wrapper");
  const acceptBtns = document.querySelectorAll(".accept");
  const closeBtn = document.querySelector(".close");

  // Hide modal if consent cookie exists
  if (getCookie("cookie_consent") === "accepted") {
    cookieCard.style.display = "none";
  }

  // Save cookie and hide modal
  acceptBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setCookie("cookie_consent", "accepted", 365);
      cookieCard.style.display = "none";
    });
  });

  // Just hide modal (no cookie)
  closeBtn.addEventListener("click", () => {
    cookieCard.style.display = "none";
  });
});

// ************************************************************************
// lang switcher
// ************************************************************************

function toggleDropdown() {
  const dropdown = document.getElementById("language-dropdown");
  dropdown.classList.toggle("hidden");
}

function changeLanguage(lang, flagUrl) {
  document.getElementById("selected-lang").innerText = lang;
  document.getElementById("selected-flag").src = flagUrl;
  closeDropdown();
  updateSelectedDot(lang);
  console.log("Language changed to:", lang);

  // Set the selected language cookie
  setCookie("selectedLang", lang, 365);

  // Reload the page
  window.location.reload();
}

function closeDropdown() {
  document.getElementById("language-dropdown").classList.add("hidden");
}

function updateSelectedDot(selectedLang) {
  document.querySelectorAll(".selected-dot").forEach((dot) => {
    dot.classList.remove("active");
  });
  const selectedDot = document.getElementById(`dot-${selectedLang}`);
  if (selectedDot) {
    selectedDot.classList.add("active");
  }
}

// Close on outside click or ESC key
document.addEventListener("click", function (event) {
  const switcher = document.querySelector(".language-switcher");
  if (!switcher.contains(event.target)) {
    closeDropdown();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeDropdown();
  }
});

// Initial dot setup for default language (DE)
updateSelectedDot("de");

// Check & update selected language on page load
function changeLanguage(langCode) {
  const currentUrl = window.location.href;

  // Save selected language in cookie
  document.cookie = `selectedLang=${langCode}; path=/`;

  // Detect and replace current language path in the URL
  let newUrl = currentUrl;

  if (langCode === "de") {
    newUrl = currentUrl.replace("/en/", "/de/");
  } else if (langCode === "en") {
    newUrl = currentUrl.replace("/de/", "/en/");
  }

  // Avoid redirect loop
  if (newUrl !== currentUrl) {
    window.location.href = newUrl;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedLangCookie = getCookie("selectedLang");
  updateSelectedDot(selectedLangCookie);
  if (selectedLangCookie) {
    const currentLocation = window.location.href;
    if (
      (selectedLangCookie === "de" && currentLocation.includes("/en/")) ||
      (selectedLangCookie === "en" && currentLocation.includes("/de/"))
    ) {
      changeLanguage(selectedLangCookie);
    }
  }
});

/* CONTACT US FORM START */

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const action = form.getAttribute("action");

  try {
    const response = await fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      successMessage.style.display = "block";
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (error) {
    alert("Failed to send message.");
  }
});
/* CONTACT US FORM END */


// ########################################################################
// Cookie consent
// ########################################################################

document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const cookieModal = document.querySelector('.cookie-modal-wrapper');
  const closeBtn = document.querySelector('.cookie-modal-close-btn');
  const savePrefsBtn = document.querySelector('.cookie-action-primary');
  const essentialOnlyBtn = document.querySelectorAll('.cookie-action-secondary')[0];
  const acceptAllBtn = document.querySelectorAll('.cookie-action-secondary')[1];
  const cookieCheckboxes = document.querySelectorAll('.cookie-category-checkbox:not([disabled])');

  // Check if user has already made a choice
  const userChoice = localStorage.getItem('cookieConsent');
  if (userChoice) {
    hideModal();
  }

  // Close button functionality
  closeBtn.addEventListener('click', hideModal);

  // Save Preferences button
  savePrefsBtn.addEventListener('click', function () {
    const consent = getCurrentSelections();
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideModal();
  });

  // Essential Only button
  essentialOnlyBtn.addEventListener('click', function () {
    cookieCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    const consent = { essential: true, externalMedia: false };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideModal();
  });

  // Accept All button
  acceptAllBtn.addEventListener('click', function () {
    cookieCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
    const consent = { essential: true, externalMedia: true };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideModal();
  });

  // ESC key to close modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cookieModal.style.display !== 'none') {
      hideModal();
    }
  });

  // Helper function to hide modal
  function hideModal() {
    cookieModal.style.display = 'none';
  }

  // Helper function to get current checkbox selections
  function getCurrentSelections() {
    return {
      essential: true, // Always true as it's required
      externalMedia: document.getElementById('external-media').checked
    };
  }

  // Optional: Close when clicking outside the modal
  cookieModal.addEventListener('click', function (e) {
    if (e.target === cookieModal) {
      hideModal();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.querySelector('.tech-modal-overlay');
  const modalContainer = document.querySelector('.tech-modal-container');
  const closeBtn = document.querySelector('.tech-modal-close-btn');
  const declineBtn = document.querySelector('.tech-decline-btn');

  // Function to show modal with animation
  function showModal() {
    modalOverlay.style.display = 'flex';

    // Trigger reflow to enable animation
    void modalOverlay.offsetWidth;

    modalOverlay.style.opacity = '1';
    modalContainer.style.transform = 'scale(1)';
    modalContainer.style.opacity = '1';
  }

  // Function to close modal with animation
  function closeModal() {
    modalOverlay.style.opacity = '0';
    modalContainer.style.transform = 'scale(0.95)';
    modalContainer.style.opacity = '0';

    // Remove modal after animation completes
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
  }

  // Show modal after 5 seconds
  setTimeout(showModal, 5000);

  // Close when X button is clicked
  closeBtn.addEventListener('click', closeModal);

  // Close when decline button is clicked
  declineBtn.addEventListener('click', closeModal);

  // Close when clicking outside the modal
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Prevent clicks inside modal from closing it
  modalContainer.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Handle form submission
  const form = document.querySelector('.tech-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.querySelector('.tech-email-input');
      const email = emailInput.value.trim();

      if (email) {
        // Here you would typically send the email to your server
        console.log('Submitted email:', email);
        alert('Thank you for your interest! We\'ll be in touch soon.');
        closeModal();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
});


// ####################################
// phone number js
// ####################################

const phoneInputField = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInputField, {
  separateDialCode: true,
  initialCountry: "in", // default India
  preferredCountries: ["in", "us", "gb", "ae"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

// Optional: To append full international number to payload
document.getElementById("contact-form").addEventListener("submit", function () {
  const fullPhoneInput = document.createElement("input");
  fullPhoneInput.type = "hidden";
  fullPhoneInput.name = "fullPhone";
  fullPhoneInput.value = iti.getNumber(); // e.g., +919999999999
  this.appendChild(fullPhoneInput);
});
