document.addEventListener("DOMContentLoaded", function () {
  const termsCheckbox = document.getElementById("terms");
  const submitButton = document.getElementById("submit-button");

  console.log("termsCheckbox.value", termsCheckbox.value);

  function toggleSubmitButton() {
    if (termsCheckbox.checked) {
      submitButton.disabled = false;
      submitButton.classList.remove("bg-gray-400", "cursor-not-allowed");
      submitButton.classList.add(
        "bg-blue-600",
        "hover:bg-blue-700",
        "cursor-pointer",
        "text-white"
      );
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove(
        "bg-blue-600",
        "hover:bg-blue-700",
        "cursor-pointer",
        "text-white"
      );
      submitButton.classList.add("bg-gray-400", "cursor-not-allowed");
    }
  }

  // Initial state check
  toggleSubmitButton();

  // Listen for change
  termsCheckbox.addEventListener("change", toggleSubmitButton);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successBox = document.getElementById("success-message");
  const submitBtn = form.querySelector('button[type="submit"]');
  const ENDPOINT = "http://localhost:3000/send-mail/contact";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successBox.style.display = "none";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }

      successBox.textContent =
        data?.message || "✅ Your message has been sent successfully!";
      successBox.style.display = "block";
      form.reset();
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong while sending your message.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
