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
